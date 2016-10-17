//把这个文件中的变量保护起来，只在这个文件中使用 ;(function (){})(); 或者 ;(function (){}());
;(function(){// 压缩之后文件之间分离 
	/*------------------ 自适应屏幕的高度----------------------*/
	var main = tools.$("#main");
	var header = tools.$("#header");
	changeHeight();
	function changeHeight(){
		var clinetH = tools.view().H;  //可视区的高
		main.style.height = clinetH - header.offsetHeight + "px";	
	}
	//绑定一个resize
	tools.addEvent(window,"resize",changeHeight);
	/*-----------------获取元素----------------------------*/
	var creatNewFile = tools.$('.creatNewFile')[0];
	var checkBox =tools.$('.checkBox')[0];
	var checkAll = tools.$('.checkAll',checkBox)[0];			 	
	var list =tools.$('#list');	
	var allLi = tools.$('.filesLi',list);//获取所有的li  每一个文件都是一个li
	var allSpan = tools.$('span',list);//获取所有的span 跟li 对应
	var tips = tools.$('#tips');
	var emptyBox = tools.$('.emptyBox')[0];	 
	/*------------------数据生成页面结构----------------------*/
	//找到某一类class的元素，身上自定属性  data-file-id----匹配到的元素    
	function getTreeById(classNams,id,parents){
       var classElement = tools.$("."+classNams,parents);
       for( var i = 0; i < classElement.length; i++ ){
         if( classElement[i].dataset.fileId == id ){
            return  classElement[i];
         }
       }
       return null;
    }
	//找到所有孩子数据
	function getChildsById(data,id){ 
		var arr = [];
		for( var i = 0; i < data.length; i++ ){
			if( data[i].pid == id){//如果当前数据的pid即父集的id 等于了当前数据的id  就把所有pid=当前id的数据放到一个数组里
				arr.push(data[i]);
			}
		}
		return arr;
	}
	//找到所有祖先数据
	function getParentsById(data,id){
		var arr=[];
		for(var i=0;i<data.length;i++){			
			if(data[i].id==id){
				arr.push(data[i]);
				arr = arr.concat(getParentsById(data,data[i].pid));//找到最后  将所有的返回值连接起来
			}
		}
		return arr;
	}		
	var datas = data.files;//拿到数据
	var initId = 0;//初始第一层数据的id是为0	
	 //***---------------文件区域的生成-----------------
	function creatHtml(data){
		var html ='<li class = "filesLi" data-file-id='+data.id+'>'
		+'<p class = "fileImg">'
		+'<span></span>' 
		+'<strong class = "img"></strong></p>'					
	    +'<p class = "fileName">'+data.title+'</p>'
	    +'<input type = "text" class = "resetName"></li>' ;  
		return html;//生成一条结构				 	 
	} 
	//-------------生成文件区域的函数	  
	function creatFileHtml(datas,id){
		var childs = getChildsById(datas,id);//所有的孩子数据
		var str = '';
		for(var i=0;i<childs.length;i++){	//循环数据 放到结构里		 		 
			//找到父级id是0的数据  及第一层文件
			str += creatHtml(childs[i]); //新生成的数据 存入一个变量			 
		}
		return str;
	}
	list.innerHTML = creatFileHtml(datas,initId)//生成一条 放入结构里面一条		
	function creatEmpty(){
		var str='';
		str = "<div class='emptyBox'>"
				+"<div class='emptyImg'></div>"
				+"<p class='emptyTitle'>暂无文件</p>"
				+"<p class='emptyContent'>请点击左上角的“上传”按钮添加</p>"
			    +"</div>";
		return str;
	}
	//**----------------渲染区域函数
	function renderFileTreeNav(fileId){
		//文件区域
		list.innerHTML = creatFileHtml(datas,fileId);
		//导航区域
		fileNav.innerHTML = createPathNavConstruct(datas,fileId); 
		//树形菜单区域
		var prev = getTreeById("treeTitle",initId);
		var trees = getTreeById("treeTitle",fileId);
        tools.removeClass(prev,"treeNav");//清除上一个元素的背景颜色
        tools.addClass(trees,"treeNav");//给当前元素添加上背景颜色
        initId = fileId;//上一个元素等于当前的元素 下一次开始就是上一次操作的元素      
        for(var i=0;i<allLi.length;i++){
			fn(allLi[i]);//给所有的li添加事件 还有其中的单选按钮 			
		}
        allCheck();  
        if(allLi.length===0){ 
        	list.innerHTML = creatEmpty();	        
    	} 
	} 
	
	//给文件区域的文件添加事件处理 事件委托
//	tools.addEvent(list,"click",function (ev){
//      var target = ev.target;
//      // 找某个祖先为file-item 还要找某个元素为checkbox
//      if(target = tools.parents(target,".filesLi")){
//          var fileId = target.dataset.fileId;
//          renderFileTreeNav(fileId);
//      }
//  });	 
    //***-------------导航目录的生成
    var fileNav = tools.$('.fileNav')[0];
    function createPathNavConstruct(datas,id){ 
        var parents = getParentsById(datas,id).reverse(); //命名的顺序
        var str = ''; 
        var zIndex = parents.length+10; //层级增加
       for( var i = 0; i < parents.length-1; i++ ){
           str += '<a href="javascript:;"'
           +' style="z-index:'+(zIndex--)+'" data-file-id="'+parents[i].id+'">'+parents[i].title+'</a>';                                     
       }
       str += '<span class="current-path" style="z-index:'+zIndex+'" data-file-id="'+parents[parents.length-1].id+'">'+parents[parents.length-1].title+'</span>';   
        return str;
    } 
   fileNav.innerHTML = createPathNavConstruct(datas,0);  
   //利用事件委托  点击导航栏的所有的a标签   可视为什么会触发到全选按钮身上呢 他们并不是同一个标签下的  a  而且a标签有hover事件？？？
   tools.addEvent(fileNav,"click",function (ev){// 点击事件函数 是fileNav   		
   		var target = ev.target;//找到目标源
   		if( target.nodeName === "A" ){//找到所有的a标签   点击的是所有的a标签     			 
	        var fileId = target.dataset.fileId;		
	        renderFileTreeNav(fileId); 	  
	        allCheck();	         
        }   		
   })    
   //**-------------树形菜单区域--------    
    var listTree=tools.$(".listTree")[0];
    function createTreeLi(datas,tree_childs){
   		var level = dataAction.getLevel(datas,tree_childs.id); 
        var hasChild = dataAction.hasChilds(datas,tree_childs.id);
        var treeContro = hasChild ? "treeContro" : "treeControNone";
        var html ='';
        html += '<li>'
            +'<div data-file-id="'+tree_childs.id+'" class="treeTitle '+treeContro+'" style="padding-left:'+level*14+'px;">'
                +'<span>'
                    +'<strong class="ellipsis">'+tree_childs.title+'</strong>'
                    +'<i class="ico"></i>'
                +'</span>'
            +'</div>'
          html += createTreeHtml(datas,tree_childs.id);
          html += '</li>';
          return html;
   }
   function createTreeHtml(datas,id){
        var tree_childs = getChildsById(datas,id);
        var html =  '<ul>';
          for( var i = 0; i < tree_childs.length; i++ ){            
              html += createTreeLi(datas,tree_childs[i]);             
          }
         html += '</ul>';
         return html;
    }
    listTree.innerHTML = createTreeHtml(datas,-1);
    tools.addClass(tools.getTreeById("treeTitle",initId),"treeNav");
   //找到所有树形菜单的标题   treeTitle
    var treeTitle = tools.$('.treeTitle');
    var prevTree = treeTitle[0];//找到上一个标题是treeTile 的元素    
    for( var i = 0; i < treeTitle.length; i++ ){
     	tools.addEvent(treeTitle[i],"click",function (ev){//给每一个标题添加点击事件处理
         	var fileId = this.dataset.fileId;
         	//渲染文件区域的内容  	  
         	renderFileTreeNav(fileId);    
         	ev.stopPropagation();//阻止事件冒泡 
         	allCheck();         	
      });
     	tools.addEvent(treeTitle[i],"mousedown",function (ev){
     		ev.stopPropagation();//阻止事件冒泡 
     	})
    }
    getTreeById('treeTitle',-1)//默认是第一层有背景颜色 标题微云有背景颜色     
	/*----------------筛选被选中的单选按钮函数whoSle()--------------*/
	function whoSle(){
		var arr = [];//声明一个空数组 用来存放被选中的input对应的tr 数组中可以存放任何类型的数据
		for(var i =0;i<allSpan.length;i++){
			if( allSpan[i].className=='checkBox2' ){//如果当前的单选按钮时选中的状态 
				arr.push(allSpan[i].parentNode.parentNode);//将对应的li放到一个数组里  数组可以存放任何类型的数据
			}
		}
		return arr;//返回的是一个数组
	}
	/*--------------------是否全选函数--------------*/
	function allCheck(){
		if(whoSle().length==allSpan.length&&allLi.length!==0){//判断所有的小方块是否被选中
			checkAll.className = 'checkedAll';			 			
			onoffAll = false;
		}else{
			checkAll.className = 'checkAll';			 			
			onoffAll = true;
		}
	}
	/*-------------弹框提示-------------------*/
	var tips = tools.$("#tips"); 
	function Tip(classNames){
        //先瞬间拉回到-32，在运动到0
        tips.style.transition = "none";
        tips.style.top = "-40px";        
        setTimeout(function (){
           tips.className = classNames;
           //tools.addClass(tips,classNames);//class代表的是背景图片 样式需要加下 
           tips.style.transition = ".3s";
           tips.style.top = 0;     
        },0); 
        clearTimeout(tips.timer);
        tips.timer = setTimeout(function (){
            tips.style.top = "-40px";   
        },2000);
    }	
	/*---------------------- 文件夹的移入移出和小方块的点击事件----------------------*/	 
	for(var i=0;i<allLi.length;i++){
		fn(allLi[i]);		
	} 
	function fn(li){ //每一项li的处理		
		var span = li.getElementsByTagName('span')[0];//获取当前li下的单选按钮 
		li.onclick = function(){//点击li  进入下一级 不用阻止事件冒泡
            var fileId = this.dataset.fileId;
            renderFileTreeNav(fileId);  //渲染数据        
            checkAll.className = 'checkAll';	//进入下一层全选是未选中的状态		 			
			onoffAll = true; 			
		}
		li.onmouseover = function(){  //鼠标移入li的时候
			if( isDrag ) return;//判断正在拖拽的时候 
			if(span.onoff){ //移入的时候判断方块是否被点击过  true 是没有被选中的状态
				span.className = 'checkBox1';
			}else{
				span.className = 'checkBox2';
			}
			tools.addClass(this,'bg');			 
			this.style.border = '1px solid #c3d8f0'	;			 
		}
		li.onmouseout = function(){   
			if(span.onoff){ //移出的时候也需要判断是否被点击过 true是小方块未选中的状态
				this.style.border = '1px solid #fff';
	 			tools.removeClass(this,'bg');	
	 			span.className = ''; 			 						
			}else{//小方块选中的状态
				span.className = 'checkBox2';
				tools.addClass(this,'bg');	
				this.style.border = '1px solid #c3d8f0';
			}			 
		} 
		//点击li上的每个方块
		span.onoff = true;		 
		span.onclick = function(ev){ //点击每个单选小方块的时候  fasle是小块选中的状态 true是未选中			
			if(span.onoff){	 
				this.className = 'checkBox2';	
				if(whoSle().length==allSpan.length){//判断所有的小方块是否被选中 全被选中 则全选也被选中
					checkAll.className = 'checkedAll';			 			
					onoffAll = false;
				}			 				
			}else{ //否则全选是未选中状态 
				this.className = 'checkBox1';	
				checkAll.className = 'checkAll';//全选的状态
				onoffAll = true;
			}
			tools.addClass(this,'bg'); //触发小方块的点击事件的时候 li的背景和边框都发生变化
			li.style.border = '1px solid #c3d8f0'
			span.onoff = !span.onoff;	
			ev.stopPropagation();//阻止事件冒泡
		}
 		span.onmousedown = function(ev){	//onmousedown onmouseup 都需要阻止事件冒泡
 			ev.stopPropagation();//阻止事件冒泡			 
 		}
 		span.onmouseup = function(ev){	// onmousedown onmouseup 都需要阻止事件冒泡
 			ev.stopPropagation();//阻止事件冒泡
 		} 
		//document需要再次点击两次才可以取消选中的状态  因为给document设置了状态？？？？？？？？？？？
	}  			 	
	/*-----------------------------全选----------------------*/				 	
	var onoffAll = true; //记录全选按钮的状态  false全选未选中  true全选选中
	checkAll.onmousedown = function(ev){
		ev.stopPropagation();//阻止事件冒泡
	}
	checkAll.onmouseup = function(ev){
		ev.stopPropagation();//阻止事件冒泡
	}	 
	checkAll.onclick = function(ev){//点击全选按钮		
		if(onoffAll){//全选选中的状态
			//console.log(allLi.length)//length是4？？ 可是文件夹为啥选中的不对呢
			for(var i=0;i<allLi.length;i++){   //全选的 时候 li里面的效果	 
				allLi[i].style.border = '1px solid #c3d8f0'; //li的边框
				tools.addClass(allLi[i],'bg');//添加class
				//allLi[i].className = 'bg'; //li的背景变为有颜色的 //li有两个class 
				allSpan[i].className = 'checkBox2';//所有小方块
				allSpan[i].onoff =false; //全选的时候改变小块的的点击状态 为false				
			} 
			checkAll.className = 'checkedAll';	//全选选中的状态		 			
			onoffAll = false;
		}else{
			for(var i=0;i<allLi.length;i++){ //全选没有选中的状态
				allLi[i].style.border = '1px solid #fff'; 
				tools.removeClass(allLi[i],'bg');//去掉class
				allSpan[i].className = '';
				allSpan[i].onoff =true;  //全选未选中的时候改变小块的的点击状态 为true
			}
			checkAll.className = 'checkAll';
			onoffAll = true;
		}
		//如果文件夹区域没有文件了  再次点击全选是不可以选的状态
		if(allLi.length==0){
			checkAll.className = 'checkAll';
			onoffAll = true;
		}		
		ev.stopPropagation();//阻止事件冒泡
	}
	 
	/*--------------------------- 选框-------------------------*/
	//阻止浏览器的一些默认行为
	//左侧目录 上册input 新建导航 
	//函数
	function getRect(obj){
		return obj.getBoundingClientRect();
	}
	function duang(obj1,obj2){
		var obj1Info = getRect(obj1);	
		var obj2Info = getRect(obj2);	
		//obj1的上下左右 选框
		var obj1L = obj1Info.left;
		var obj1R = obj1Info.right;
		var obj1T = obj1Info.top;
		var obj1B = obj1Info.bottom;
		//obj2的上下左右  被碰撞的元素
		var obj2L = obj2Info.left;
		var obj2R = obj2Info.right;
		var obj2T = obj2Info.top;
		var obj2B = obj2Info.bottom;  
		if( obj1R < obj2L || obj1L > obj2R || obj1B < obj2T || obj1T > obj2B){
			return false;
		}else{
			return true;
		}
	} 
	//框选----------------框选不上
	var newDiv = null;
    var disX = disY = 0;
    var shadowTarget = null; //
    var tipss = null;
    tools.addEvent(document,"mousedown",function (ev){     	 
	    var target = ev.target; 
	    ev.preventDefault(); //阻止浏览器的默认行为
	    if( tools.parents(target,".handleFile") || 
           tools.parents(target,".listTree") ||
           tools.parents(target,".directory")  || deleteFiles.dele || allLi.length === 0 ||moveFileTo.isMove || resetFileName.reset
        ){
          return;
        }
	    newDiv = null;
	    disX = ev.clientX;//按下的鼠标位置
	    disY = ev.clientY; 
	      //拖拽移动 
	    if( tools.parents(target,".filesLi") ){//down的位置在li  如果down的是在li身上 
            tools.addEvent(document,"mousemove",moveFileFn);
            tools.addEvent(document,"mouseup",upFileFn); 
            shadowTarget = tools.parents(target,".filesLi");// 找到拖拽目标的父节点li
            //重新给渲染之后的加事件
            return;
	    }
	    tools.addEvent(document,"mousemove",moveFn);//选框的move
	    tools.addEvent(document,"mouseup",upFn);
	    for(var i=0;i<allLi.length;i++){   // 
			allLi[i].style.border = '1px solid #fff'; //li的边框
			tools.removeClass(allLi[i],'bg'); //li的背景变为没有颜色的
			allSpan[i].className = '';//所有小方块
			allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false
		}		
		checkAll.className = 'checkAll';//全选的未选中
		onoffAll = true;	   
	})
	/*-------------------剪影----------------------*/ 
	function  moveFileShadow(){//创建一个剪影div
        var newDiv = document.createElement("div");//创建新的div 剪影div
        newDiv.className = 'drag-helper ui-draggable-dragging';	
        var html = '<div class="icons">'
                    +'<i class="icon icon0 filetype icon-folder"></i>'  
                    +'</div>'
                    +'<span class="sum">1</span>';	
        newDiv.innerHTML = html;
        return newDiv;
    }
    var shadow = null;//剪影
    var isDrag = false;  //是否正在拖拽剪影
    var pengObj = null;  //碰上的那个元素
    function moveFileFn(ev){// 移动文件 函数
       if( Math.abs(ev.clientX - disX) > 10 ||  Math.abs(ev.clientY - disY) > 10 ){           
           if(!shadow){//没有剪影的时候 
               shadow = moveFileShadow();//创建剪影
               document.body.appendChild(shadow);  
               shadow.style.display = 'block';
               tipss = document.createElement("div");//拖拽文件的个数提示
               tipss.style.cssText = 'width:30px;height: 30px;position:absolute;left:0;top:0;'
               document.body.appendChild(tipss);                 
           }
           isDrag = true;//可以拖拽
           tipss.style.left = ev.clientX + 'px';
           tipss.style.top = ev.clientY + 'px';
           shadow.style.left = ev.clientX+5 + 'px';//让鼠标在剪影身上
           shadow.style.top = ev.clientY+5 + 'px';
           var oneSpan = tools.$('span',shadowTarget)[0];//获取当前下的单选框
           if( !tools.hasClass(oneSpan,"checkBox2") ){//判断是否有移动的文件夹 即文件夹是选中的状态            
               //没有移动的文件夹  清空所有的
               for( var i = 0; i < allLi.length; i++ ){
                   allLi[i].style.border = '1px solid #fff'; //li的边框
				   tools.removeClass(allLi[i],'bg'); //li的背景变为没有有颜色的
				   allSpan[i].className = '';//所有小方块
				   allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false//  
               }
               	//当前选中的li为选中的状态
               tools.addClass(shadowTarget,"bg");
               shadowTarget.style.border = '1px solid #c3d8f0'
              // var checkboxs = tools.$("span",shadowTarget)[0];
                //当前单选是选中的状态
               oneSpan.className = 'checkBox2';//所有小方块是选中的状态
			   oneSpan.onoff =false; //全选的时候改变小块的的点击状态 为false                 
           }
           //计数
           var selectArr = whoSle();//选中的文件夹
           var sum = tools.$(".sum",shadow)[0];//记录选中的个数
           var icons = tools.$(".icons",shadow)[0];
           sum.innerHTML = selectArr.length;//移动的个数
           var str = '';
           var len = selectArr.length > 4 ? 4 : selectArr.length;
           for( var i = 0; i < len; i++ ){
               str += '<i class="icon icon'+i+' filetype icon-folder"></i> '
           }
           icons.innerHTML = str;
           pengObj = null;//???
           //碰撞检测
           for( var i = 0; i < allLi.length; i++ ){  
               if(!indexOf(selectArr,allLi[i]) &&duang(tipss,allLi[i]) ){
                   allLi[i].style.background = "lightblue";
                   pengObj = allLi[i];
               }else{
                    allLi[i].style.background = "";
               }
           }
       }        
   }
//-------------------------
	function indexOf(arr,item){
	    for( var i = 0; i < arr.length; i++ ){
	          if( arr[i] === item ){
	          return true;
	        }
	    }  
	    return false;
	}
	function upFileFn(){
        tools.removeEvent(document,"mousemove",moveFileFn);
        tools.removeEvent(document,"mouseup",upFileFn);
        if( shadow ){
          document.body.removeChild(shadow);
          document.body.removeChild(tipss);//
          shadow = null;
    	}   
      //如果被碰上的元素存在
     // 把选中的元素对应的数据的pid变成被碰上的元素对应的id       
        if( pengObj ){
            var moveId = pengObj.dataset.fileId; 
            var childsTitle = getChildsById(datas,moveId);
            var a = true;
            b:for( var i = 0; i < whoSle().length; i++ ){
                a = true;
                var getData = getDataById(datas,whoSle()[i].dataset.fileId);
                  //要移动的数据，不能存在于被移入的数据的子数据中 
                 //判断的依据是数据的 title
                for( var j = 0; j < childsTitle.length; j++ ){
                    if( childsTitle[j].title == getData.title ){
                        Tip("some");//移动部分失败
                        a = false; 
                        break;
                    }
                }
                if( a ){
                      getData.pid = moveId;
                }  
            }
           var cur = tools.$(".current-path")[0].dataset.fileId;
            //-----文件区域
            list.innerHTML = creatFileHtml(datas,cur);
            //-----树形菜单
            listTree.innerHTML = createTreeHtml(datas,-1); 
            //定位到某个菜单上 
            tools.addClass(tools.getTreeById("treeTitle",cur),"treeNav"); //  
            //文件区事件
     		renderFileTreeNav(cur);
     		//左侧树形菜单事件
		    var prevTree = treeTitle[0];//找到上一个标题是treeTile 的元素    
		    for( var i = 0; i < treeTitle.length; i++ ){
		     	tools.addEvent(treeTitle[i],"click",function (){//给每一个标题添加点击事件处理
		         	var fileId = this.dataset.fileId;
		         	//渲染文件区域的内容  	  
		         	renderFileTreeNav(fileId);   
		       })
		    }         		
            pengObj = null;
       }
        isDrag  = false; 
   }
   function moveFn(ev){ //移动函数 框选   	
       if( Math.abs(ev.clientX - disX) > 20 ||  Math.abs(ev.clientY - disY) > 20 ){
           if( !newDiv ){
               newDiv = document.createElement("div");
               newDiv.className = "newdiv";
               newDiv.style.left = disX + "px";
               newDiv.style.top = disX + "px";
               document.body.appendChild(newDiv);
           }
           newDiv.style.width = Math.abs(ev.clientX - disX) + "px";
           newDiv.style.height = Math.abs(ev.clientY - disY) + "px";   
           newDiv.style.left = Math.min(ev.clientX , disX)+1 + "px";
           newDiv.style.top = Math.min(ev.clientY , disY)+1 + "px";
          //拖拽的过程中，newDiv和哪一个box碰上了   
          for( var i = 0; i < allLi.length; i++ ){
               if( duang(newDiv,allLi[i]) ){
                    allLi[i].style.border = '1px solid #c3d8f0'; //li的边框
		 			tools.addClass(allLi[i],'bg');//li的背景变为有颜色的
		 			allSpan[i].className = 'checkBox2';//所有小方块
		 			allSpan[i].onoff =false; //全选的时候改变小块的的点击状态 为false 		           
               }else{
                   allLi[i].style.border = '1px solid #fff'; //li的边框
				   tools.removeClass(allLi[i],'bg'); //li的背景变为有颜色的
				   allSpan[i].className = '';//所有小方块
				   allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false//  
               }
           }         
       }  
   }
   function upFn(){//鼠标抬起的时候 框选消失
      tools.removeEvent(document,"mousemove",moveFn);
      tools.removeEvent(document,"mouseup",upFn);
      if( newDiv ) document.body.removeChild(newDiv); 
      allCheck();//框选完 判断全选的状态
   }	
   //上面的为框选和移动 --------------
   //移动和删除的时候需要判断下之前是否点击了新建和重命名函数  这样写有些麻烦 可以封装下
    //新建名事件内容-----------*********-------
    function creatEv(){
    	var newli = list.getElementsByTagName('li');//为什么所有的都加上事件处理？？？ 因为每次都是新生成的 事件绑定？？
		for(var i=0;i<newli.length;i++){
			fn(newli[i]);//程序刚开始都加了事件 此处为啥需要再加一次呢
		} 
		var first = list.firstElementChild;//获取第一个孩子 即新建的li
		var resetName =tools.$('.resetName',first)[0];
		var fileName =tools.$('.fileName',first)[0];	//获取当前新建的input和标题
		 //导航中最后一个元素
        var fileNavLast = tools.$("span",fileNav)[0];
        var pid = fileNavLast.dataset.fileId; 	  
		if(!resetName.value.trim()){//没有输入内容的时候
 			list.removeChild(first);  //结构里删除 	 	
 		}else if(repeatName(datas,pid,resetName.value)){  
 			Tip('samename');   
			list.removeChild(first);    
 		}else{ 
 			var newObj = {
				id:first.dataset.fileId,
				pid:pid, 
				title:resetName.value,
				type:"file"
			}	
 			fileName.style.display = 'block';	//p标签显示//	 
			fileName.innerHTML =resetName.value;; //p标题和数据的保持一致
			resetName.style.display = 'none'; //input输入框隐藏
 			datas.unshift(newObj);
 			Tip('creatscu');  
			var tree = tools.getTreeById("treeTitle",pid);
            var nextUl = tree.nextElementSibling;
            nextUl.innerHTML += createTreeLi(datas,newObj);  
            var treeTitle = tools.$('.treeTitle'); 
		    for( var i = 0; i < treeTitle.length; i++ ){
		     	tools.addEvent(treeTitle[i],"click",function (){//给每一个标题添加点击事件处理
		         	var fileId = this.dataset.fileId; 
		         	renderFileTreeNav(fileId);   
		       })
		    } 
            tools.removeClass(tools.getTreeById("treeTitle",pid),"treeControNone");
            tools.addClass(tools.getTreeById("treeTitle",pid),"treeContro"); 
            checkAll.className = 'checkAll';
			onoffAll = true;              
 			for(var i=0;i<allLi.length;i++){   //新建成功一个时候 li取消选中的效果
 				allLi[i].style.border = '1px solid #fff'; //li的边框
 				tools.removeClass(allLi[i],'bg');//添加class
 				allSpan[i].className = '';//所有小方块
 				allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false
 			} 
 		}
    }
   //重命名事件内容-----------*********---------
    function reNameEv(){
   		var fileId = whoSle()[0].dataset.fileId;
		var resetName =tools.$('.resetName',whoSle()[0])[0];//获取的是选中的这项的input里的内容			
		var fileName =tools.$('.fileName',whoSle()[0])[0];//获取的是选中这些的标题 	 			 
		resetName.style.display = 'none';
		fileName.style.display = 'block';
		if(resetName.value.trim()){//文本框里输入内容的时候 排除掉空格
		//命名冲突的时候
		//排除重名 不包括和当前这项重名的 
			for(var i=0;i<fileNames.length;i++){//fileNames	 获取的是当前所有兄弟的标题  不同兄弟层级的可以重名	 
				if((resetName.value != fileName.innerHTML)&&(resetName.value==fileNames[i].innerHTML)){				 				
	 			 	Tip('samename');
	 			 	for(var i=0;i<allLi.length;i++){   //成功一个时候 li取消选中的效果 	 			
						allLi[i].style.border = '1px solid #fff'; //li的边框 				
						tools.removeClass(allLi[i],'bg'); //li的背景变为没有颜色的 //要去除的是一个class名
						allSpan[i].className = '';
						allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false 				 
					}
					return;
				}
			}
		//重命名成功
			if(resetName.value == fileName.innerHTML||!resetName.value){//不重名的时候 和当前的名字一样的或者输入的内容是空的时候
			 //命名的和当前命名这项的标题一样的时候
 				fileName.innerHTML = resetName.value;// 数据里的名字需要和结构里的保持一致	
 				//名字和当前命名这项是一样的 数据里面不用改
			}else{ //重命名成功 
 				fileName.innerHTML = resetName.value;// 数据里的名字需要和结构里的保持一致	
 				//数据里的名字
 				var title = resetName.value;		 				  			
				for(var i=0;i<datas.length;i++){ 
					if(fileId==datas[i].id){//找到一样的ID 
						datas[i].title=title;//修改数据里的名字
						break;
					}
				}						 
				//左侧树形菜单的名字也需要更改
				var ellipsis = tools.$('.ellipsis');//左侧所有的标题 
				for(var i=0;i<datas.length;i++){
					if(fileId==treeTitle[i].dataset.fileId){
						ellipsis[i].innerHTML =title ;//左侧树形菜单的名字
					}
				}
 				Tip('succ');
 				for(var i=0;i<allLi.length;i++){
					fn(allLi[i]);		
				}  
 			} 
		} 
   }
   /*------------------------------- 新建文件夹----------------------*/	
	var resetName = tools.$('.resetName');//所有的input
	for(var i = 0;i<resetName.length;i++){
		resetName[i].onclick = function(ev){
			ev.stopPropagation();//阻止事件冒泡
		}
	}	
	var fileNames = tools.$('.fileName')//获取所有的标题  
	//重名函数
	function repeatName(datas,pid,title){
		//重名函数
		var childs = getChildsById(datas,pid);
    	for( var i = 0; i < childs.length; i++ ){
    		if( childs[i].title === title ){
    			return true;
    		}
    	}
    	return false;
	}	
	//新建文件夹
	creatNewFile.onclick  =function(){
		//新建的时候 之前点击了重命名	都按新建的来 	
   		if( resetFileName.reset){
          	//判断下如果新建input里是否输入了内容 输入了 就按新建的来 
          	var resetName =tools.$('.resetName',whoSle()[0])[0];//获取的是选中的这项的input里的内容 
	 		var fileName =tools.$('.fileName',whoSle()[0])[0];//获取的是选中这些的标题	 		
 	 		fileName.style.display = 'block';//标题隐藏
 	 		resetName.style.display = 'none'; 
        }
   		//新建狂点------------？？？？？？？？？？？？
		if(creatNewFile.onoff){			 
			return;
		}
		creatNewFile.onoff =true;//记录是新建的状态		 
		var newLi = creatHtml({
	            id:tools.uuid()//随机生成一个id
	        });
		list.innerHTML  = newLi + list.innerHTML;
		for(var i=0;i<allLi.length;i++){
			fn(allLi[i]);		
		} 
		var first = list.firstElementChild;
		var resetName =tools.$('.resetName',first)[0];
		var fileName =tools.$('.fileName',first)[0];	//获取当前新建的input和标题		
		fileName.style.display = 'none';
		resetName.style.display = 'block';
		resetName.focus();//input  程序获取焦点 	
		//回车键  ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
//		resetName.onkeydown = function(ev){
//			if(ev.keyCode ==13){
//				customCreat(); 
//			}
//		}
		tools.addEvent(resetName,"click",function (ev){
            ev.stopPropagation();//input的点击事件需要组织事件冒泡    
        });
        tools.addEvent(resetName,"mousedown",function (ev){
            ev.stopPropagation();   //input的mousedown事件需要组织事件冒泡    
        });        
	}
 	 tools.addEvent(creatNewFile,"mousedown",function (ev){
         ev.stopPropagation();  //阻止新建的冒泡  
    });
	//用document来处理新建成功与否
	tools.addEvent(document,"mousedown",function (){
   		//用这个判断是否新建成功
   		if(creatNewFile.onoff){//判断是新建的时候
   			var newli = list.getElementsByTagName('li');//为什么所有的都加上事件处理？？？ 因为每次都是新生成的 事件绑定？？
			for(var i=0;i<newli.length;i++){
				fn(newli[i]);//程序刚开始都加了事件 此处为啥需要再加一次呢
			} 
   			var first = list.firstElementChild;//获取第一个孩子 即新建的li
   			var resetName =tools.$('.resetName',first)[0];
			var fileName =tools.$('.fileName',first)[0];	//获取当前新建的input和标题			
			 //导航中最后一个元素
	        var fileNavLast = tools.$("span",fileNav)[0];
	        var pid = fileNavLast.dataset.fileId; 	        
			if(!resetName.value.trim()){//没有输入内容的时候
	 			list.removeChild(first);  //结构里删除 	  
	 		}else if(repeatName(datas,pid,resetName.value)){ //重名的时候 
	 			Tip('samename');  
				//结构和数据里相应的删除
				list.removeChild(first);  //结构里删除	   			 
	 		}else{//新建成功
	 			var newObj = {
					id:first.dataset.fileId,
					pid:pid, 
					title:resetName.value,
					type:"file"
				}	 			
	 			fileName.style.display = 'block';	//p标签显示//	 
				fileName.innerHTML =resetName.value;; //p标题和数据的保持一致
				resetName.style.display = 'none'; //input输入框隐藏
	 			datas.unshift(newObj);
	 			Tip('creatscu'); 
	 			if(allLi.length !==0){ 
	 				list.innerHTML = creatFileHtml(datas,pid);	        
		    	}
	 			for(var i=0;i<allLi.length;i++){
					fn(allLi[i]);		
				} 
				//要找到当前这个新建的文件的父级对应的左侧树形菜单， //新建成功之后 新建的左侧那个点击不了？？？
				var tree = tools.getTreeById("treeTitle",pid);
                var nextUl = tree.nextElementSibling;
                nextUl.innerHTML += createTreeLi(datas,newObj);  
                //左侧的树形菜单也得有点击事件
                var treeTitle = tools.$('.treeTitle'); 
			    for( var i = 0; i < treeTitle.length; i++ ){
			     	tools.addEvent(treeTitle[i],"click",function (){//给每一个标题添加点击事件处理
			         	var fileId = this.dataset.fileId;
			         	//渲染文件区域的内容  	  
			         	renderFileTreeNav(fileId);  			         	
			       })
			    }			    
			     //要让有子数据的菜单有箭头
                tools.removeClass(tools.getTreeById("treeTitle",pid),"treeControNone");
                tools.addClass(tools.getTreeById("treeTitle",pid),"treeContro");
                //点击新建成功  全选未选中
                checkAll.className = 'checkAll';
				onoffAll = true;             
               	//所有的单选和li				
	 			for(var i=0;i<allLi.length;i++){   //新建成功一个时候 li取消选中的效果
	 				allLi[i].style.border = '1px solid #fff'; //li的边框
	 				tools.removeClass(allLi[i],'bg');//添加class
	 				allSpan[i].className = '';//所有小方块
	 				allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false
	 			} 
	 		}
	 		creatNewFile.onoff = false;	//新建之后 改变新建的状态
   		} 
   	});
	/*--------------------------重命名文件夹 ----------------------*/
	var resetFileName =tools.$('.resetFileName')[0];//获取重命名元素	 
	resetFileName.onclick = function(ev){	
		 
        //重命名的时候 如果之前点击了新建   需要看下新建的input的是否输入了内容 输入了 则按新建的来 没有输入 按重命名的来           
 		if(creatNewFile.onoff){//之前点击了新建状态 	 
 			var first = list.firstElementChild;//获取第一个孩子 即新建的li
   			var resetName =tools.$('.resetName',first)[0]; 
			var fileName =tools.$('.fileName',first)[0];	//获取当前新建的input和标题 			
 			if(!resetName.value){ //当前input没有输入内容 则按重命名的来  	 
 				list.removeChild(first);  //结构里删除   				
 				creatNewFile.onoff=false;  
 			} 
 		}       
		resetFileName.reset = true;		//记录是重命名的状态 
		//creatNewFile.onoff = true;
		if(whoSle().length ===0){//没有选中的时候
			Tip('unselect');
			return;
		}
		if(whoSle().length >1){//选中大于1的时候
			Tip('onlyone');			 
			return;
		} 		
		//结构里操作   
		//获取到选中的那一个 
		var resetName =tools.$('.resetName',whoSle()[0])[0];//获取的是选中的这项的input里的内容 
 		var fileName =tools.$('.fileName',whoSle()[0])[0];//获取的是选中这些的标题 		 
 		fileName.style.display = 'none';//标题隐藏
 		resetName.style.display = 'block';
 		resetName.focus();//input  程序获取焦点	 
 		resetName.value = fileName.innerHTML; //重命名的时候 input里的内容和原标题一致 并且是选中的状态 
 		resetName.select();//选中input里的内容 	 		
 		ev.stopPropagation();
	}
	resetFileName.onmousedown = function(ev){
		ev.stopPropagation();
	}
	resetFileName.onmouseup = function(ev){
		ev.stopPropagation();
	}
	//需要找到命名这项的ID 
	tools.addEvent(document,"mousedown",function (){
		if(resetFileName.reset){//判断是重命名状态				
			if(whoSle().length ===1){
				//获取下当前选中项的数据里对应的标题
				var fileId = whoSle()[0].dataset.fileId;
				var resetName =tools.$('.resetName',whoSle()[0])[0];//获取的是选中的这项的input里的内容			
	 			var fileName =tools.$('.fileName',whoSle()[0])[0];//获取的是选中这些的标题 
	 			fileName.style.display = 'block'; //标题就显示
				resetName.style.display = 'none'; //input就隐藏
				if(resetName.value.trim()){//文本框里输入内容的时候 排除掉空格
				//命名冲突的时候
				//排除重名 不包括和当前这项重名的 
					for(var i=0;i<fileNames.length;i++){//fileNames	 获取的是当前所有兄弟的标题  不同兄弟层级的可以重名	 
						if((resetName.value != fileName.innerHTML)&&(resetName.value==fileNames[i].innerHTML)){				 				
			 			 	Tip('samename');
			 			 	for(var i=0;i<allLi.length;i++){   //成功一个时候 li取消选中的效果 	 			
								allLi[i].style.border = '1px solid #fff'; //li的边框 				
								tools.removeClass(allLi[i],'bg'); //li的背景变为没有颜色的 //要去除的是一个class名
								allSpan[i].className = '';
								allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false 				 
							}
							return;
						}
					}
				//重命名成功
					if(resetName.value == fileName.innerHTML||!resetName.value){//不重名的时候 和当前的名字一样的或者输入的内容是空的时候
					 //命名的和当前命名这项的标题一样的时候
		 				fileName.innerHTML = resetName.value;// 数据里的名字需要和结构里的保持一致	
		 				//名字和当前命名这项是一样的 数据里面不用改
					}else{ //重命名成功 
		 				fileName.innerHTML = resetName.value;// 数据里的名字需要和结构里的保持一致	
		 				//数据里的名字
		 				var title = resetName.value;		 				  			
						for(var i=0;i<datas.length;i++){ 
							if(fileId==datas[i].id){//找到一样的ID 
								datas[i].title=title;//修改数据里的名字
								break;
							}
						}						 
						//左侧树形菜单的名字也需要更改
						var ellipsis = tools.$('.ellipsis');//左侧所有的标题 
						for(var i=0;i<datas.length;i++){
							if(fileId==treeTitle[i].dataset.fileId){
								ellipsis[i].innerHTML =title ;//左侧树形菜单的名字
							}
						}
		 				Tip('succ');
		 				for(var i=0;i<allLi.length;i++){
							fn(allLi[i]);		
						}  
		 			} 
	 			} 
			}			
			//暴力清除所有的文件夹的样式
	 		for(var i=0;i<allLi.length;i++){   //成功一个时候 li取消选中的效果 	 			
				allLi[i].style.border = '1px solid #fff'; //li的边框 				
				tools.removeClass(allLi[i],'bg'); //li的背景变为没有颜色的 //要去除的是一个class名
				allSpan[i].className = '';
				allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false 				 
			}
	 		resetFileName.reset = false;
		}
	});	
	/*----------------------------- 删除文件夹-------------------------*/ 
	 //作用:找到指定id的所有的子孙数据
	function getChildsAll(datas,id){
            //通过循环数据，找到指定id的那条数据
        var arr = [];
        for( var i = 0; i < datas.length; i++ ){
            if( datas[i].id == id ){
                arr.push(datas[i]);
                var childs = getChildsById(datas,datas[i].id);
                for( var j = 0; j < childs.length; j++ ){
                   arr = arr.concat(getChildsAll(datas,childs[j].id));
                }
            }
        }
        return arr;    
    };
    //idArr 是一个数组，指定了要删除的id
	function batchDelect(datas,idArr){
        for( var i = 0; i < idArr.length; i++ ){
            var childsAll = getChildsAll(datas,idArr[i]);
            for( var j = 0; j < childsAll.length; j++ ){
                for( var k = 0; k < datas.length; k++ ){
                    if( datas[k].id == childsAll[j].id ){
                        datas.splice(k,1);
                        break;
                    }
                }
            }

        } 
  };    
   //--------------------------删除文件-------------------
	var deleteFiles = tools.$('.deleteFiles')[0]; 	
	deleteFiles.onmousedown = function(ev){	// onmousedown onmouseup 都需要阻止事件冒泡
		ev.stopPropagation();//阻止事件冒泡
	} 	 
	deleteFiles.onmouseup = function(ev){
		ev.stopPropagation();
	}
	tools.addEvent(deleteFiles,"click",function(ev){ 
		if(whoSle().length ===0){//没有选中的时候 
			Tip('unselect');			 			 
		}else{ 	
			deleteFiles.dele = true; //出现弹框的时候 记录状态
			if(creatNewFile.onoff){
				creatEv();
				creatNewFile.onoff=false;
			}
			if(resetFileName.reset){
				reNameEv();
				resetFileName.reset = false;//最后把重命名的状态改了
			}
			//出现弹框
			dialog({
                title:"删除文件",
                content:"确定要删除这个文件夹吗？",
                okFn:function (){                	
                    var idArr = [];
                    for( var i = 0; i < whoSle().length; i++ ){ 
                    	var fileId = whoSle()[i].dataset.fileId;   
                        list.removeChild(whoSle()[i]); //结构里删除  
                        var tree = tools.getTreeById("treeTitle",fileId); //树形菜单                         
                        tree.parentNode.parentNode.removeChild(tree.parentNode);
                        idArr.push(fileId);                       
                        i--;
                       // console.log(idArr)//要删除的li对应的ID                        
                    }
                    batchDelect(datas,idArr);   
                    deleteFiles.dele = false;//改变删除的状态删除结束了
                    if(whoSle().length ===0){//删除到最后 
						checkAll.className = 'checkAll';// 删到最后
						onoffAll = true;			 					
				    };
				    if(allLi.length===0){ 
			        	list.innerHTML = creatEmpty();	        
			    	} 
                }
            })
		}
    })
	
	/*----------------------------移动文件夹----------------------*/ 
	function moveDialogHtml(){           
        var html = '<p class="dir-file">\
            <span class="file-img"></span>\
            <span class="file-name">我的文档</span>\
            <span class="file-num"></span>\
        </p>\
        <div class="dir-box">\
            <div class="cur-dir">\
                <span>移动到：</span><span class="fileMovePathTo">111</span>\
            </div>\
            <div class="dirTree"></div>\
        </div> '
        return html;
    };
    function getDataById(datas,id){
    	for( var i = 0; i < datas.length; i++ ){
    		if( datas[i].id == id ){
    			return datas[i];
    		}
    	}
    	return null;
    };
    function getParent(datas,id){
    	var parents = getParentsById(datas,id);
    	return parents[1];
    }
    //-------移动文件夹操作----------
	var moveFileTo = tools.$('.moveFileTo')[0];
	moveFileTo.onmousedown = function(ev){
		ev.stopPropagation();
	}
	moveFileTo.onmouseup = function(ev){
		ev.stopPropagation();
	}
	tools.addEvent(moveFileTo,"click",function (){			 
        if( whoSle().length === 0 ) {
            Tip("unselect");
        }else{
            //出现弹框
	          //点击移动全 点击了新建 或者重命名 
			//点击移动之前 点击了新建 
			if(creatNewFile.onoff){
				creatEv();
				creatNewFile.onoff=false;
			}
			//移动到之前点击了重命名 如果重名成功 提示成功 没有命名 跟之前的名字一样
			if(resetFileName.reset){
				reNameEv();
				resetFileName.reset = false;//最后把重命名的状态改了
			}
            moveFileTo.isMove = true;
            var moveId = 0;  //保存选择要移动文件的id
            var isMove = true;  //默认是不可以关闭
            dialog({
                title:"选择存储位置",
                content:moveDialogHtml(),
                okFn:function (){    
                    //可以移动
                    if( !isMove ){
                        //移动数据
                        //可以移动的文件夹下，重名的不能移动
                        var childsTitle = getChildsById(datas,moveId);
                        var a = true;
                        b:for( var i = 0; i < whoSle().length; i++ ){
                            a = true;
                            var getData = getDataById(datas,whoSle()[i].dataset.fileId);
                            //要移动的数据，不能存在于被移入的数据的子数据中 
                            //判断的依据是数据的 title
                            for( var j = 0; j < childsTitle.length; j++ ){
                                if( childsTitle[j].title == getData.title ){
                                    Tip("some");//移动部分失败 
                                    a = false; 
                                    break;
                                }
                            }
                            if( a ){
                                getData.pid = moveId;
                            }  
                        }
                         
                        //文件区域渲染
                        var cur = tools.$(".current-path")[0].dataset.fileId;
                        //-----文件区域
                        list.innerHTML = creatFileHtml(datas,cur);
                        //-----树形菜单
                        listTree.innerHTML = createTreeHtml(datas,-1); 
                        //定位到某个菜单上 
                        tools.addClass(tools.getTreeById("treeTitle",cur),"treeNav");                         
                        //文件区域事件
                        var newli = list.getElementsByTagName('li');//  
						for(var i=0;i<newli.length;i++){
							fn(newli[i]); 
						} 
						var treeTitle = tools.$('.treeTitle');
						//左侧树形菜单事件
					    var prevTree = treeTitle[0];//找到上一个标题是treeTile 的元素    
					    for( var i = 0; i < treeTitle.length; i++ ){
					     	tools.addEvent(treeTitle[i],"click",function (){//给每一个标题添加点击事件处理
					         	var fileId = this.dataset.fileId;
					         	//渲染文件区域的内容  	  
					         	renderFileTreeNav(fileId);   
					       })
					    }
					    //为什么上面两处需要还加事件呢 
					    if(allLi.length===0){ 
				        	list.innerHTML = creatEmpty();	        
				    	} 
                        moveFileTo.isMove = false;
                    }
                    return isMove;       
                }
            }); 
            //弹框的父级
            var fullPop = tools.$(".full-pop")[0];
            //渲染弹框中的树形菜单
            var dirTree = tools.$(".dirTree",fullPop)[0];
            tools.addClass(dirTree,"tree-menu-comm");//给弹框加样式
            dirTree.innerHTML = createTreeHtml(datas,-1); 
            //填写内容
            var fileName = tools.$(".file-name",fullPop)[0];// 
            var fileNum = tools.$(".file-num",fullPop)[0]; 
            var selectFirstId = whoSle()[0].dataset.fileId;
            //错误信息提示
            var error = tools.$(".error",fullPop)[0];
            fileName.innerHTML = getDataById(datas,selectFirstId).title; 
            if( whoSle().length>1 ){
                fileNum.innerHTML = '等 '+whoSle().length+' 个文件 ';
            }
            var prevId = 0;
            tools.addEvent(dirTree,"click",function (ev){
                var target = ev.target;
                if( target = tools.parents(target,".treeTitle") ){
                    isMove = false;
                    //点击菜单的那个id
                    var clickFileId = target.dataset.fileId;
                    tools.removeClass(tools.getTreeById("treeTitle",prevId,dirTree),"treeNav"); //dirTree限制范围 之前的去掉背景颜色                   
                    //  
                    tools.addClass(target,"treeNav");//被点击的加上背景颜色
                    prevId = clickFileId;//点击清空之前的
                    /*
                        1. 不能移动到被移动的这些元素的父级上
                        2. 不能移动到本身或子元素下
                        3. 可以移动的文件夹下，重名的不能移动
                    */ 
                    error.innerHTML = "";//初始的时候需要清一下之前的提示
                    //被移动的元素的父id
                    var firstSelectId = whoSle()[0].dataset.fileId;
                    var parent = getParent(datas,firstSelectId);
                    if( clickFileId == parent.id ){
                        error.innerHTML = "文件已经在当前文件夹下";
                        isMove = true;
                    }
                    // 不能移动到本身或子孙元素下 
                    //clickFileId 点击树形菜单的那个菜单的id
                    for( var i = 0; i < whoSle().length; i++ ){
                        //找到选中元素的所有的子孙数据
                        var selectId = whoSle()[i].dataset.fileId;
                        var childs = getChildsAll(datas,selectId);
                        for( var j = 0; j < childs.length; j++ ){
                            if( childs[j].id == clickFileId ){
                                error.innerHTML = "不能移动到本身或子孙元素下";
                                isMove = true;
                                break;
                            }
                        }
                    }
                    moveId = clickFileId; 
                } 
            })     
        }
    })
	/*----------------------------右击自定义菜单----------------------*/  
	var customList = tools.$('#customList'); 	
	var customListCreat = tools.$('.customListCreat',customList)[0];
	var customListDel = tools.$('.customListDel',customList)[0];
	var customListReName = tools.$('.customListReName',customList)[0];
	var customListMove = tools.$('.customListMove',customList)[0]; 	
 	//自定义新建
	function customCreat(){		 
		creatNewFile.click();
	}
	customListCreat.onclick =function(ev){	 
		customCreat();    
		ev.stopPropagation();	
		customList.style.display = "none";	
	}
	customListCreat.onmousedown =function(ev){	
		ev.stopPropagation();	
	}
	//自定义删除
	function customDel(){		 
		deleteFiles.click();
	} 
	customListDel.onclick =function(ev){	 
		customDel();  
		ev.stopPropagation();
		customList.style.display = "none";	
	}
	customListDel.onmousedown =function(ev){	
		ev.stopPropagation();	
	}
	//自定义重命名
	function customReName(){		 
		resetFileName.click();
	} 
	customListReName.onclick =function(ev){
		customReName();   
		ev.stopPropagation();	
		customList.style.display = "none";	
	}
	customListReName.onmousedown =function(ev){	
		ev.stopPropagation();	
	}
	//自定义移动到 
	function customMove(){		 
		moveFileTo.click();
	} 
	customListMove.onclick =function(ev){	 
		customMove();
		ev.stopPropagation();
		customList.style.display = "none";	
	}
	customListMove.onmousedown =function(ev){	
		ev.stopPropagation();	
	} 	
 	 tools.addEvent(document,"click",function (ev){
		customList.style.display = "none";
	 });
	 //右击菜单
	document.oncontextmenu = function (ev){   
		var target = ev.target;//找到目标源/  
   		if(target = tools.parents(target,".filesLi")){
   			for(var i=0;i<allLi.length;i++){   
 				allLi[i].style.border = '1px solid #fff';  
 				tools.removeClass(allLi[i],'bg'); 
 				allSpan[i].className = '';//所有小方块
 				allSpan[i].onoff =true; //全选的时候改变小块的的点击状态 为false
 			} 
   			var filesLi = target;//当前这项
   			var onspan =filesLi.getElementsByTagName('span')[0];
 			onspan.className = 'checkBox2';
 			onspan.onoff =false;
 			tools.addClass(filesLi,'bg');  			
 			filesLi.style.border = '1px solid #c3d8f0';
 			
   			customList.style.display = "block"; //右击菜单
			customList.style.left = ev.clientX + "px";
			customList.style.top = ev.clientY + "px"; 
			ev.preventDefault();//阻止浏览器的默认行为		
   		}
		
	}	
 })();
 



