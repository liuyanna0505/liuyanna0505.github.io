// JavaScript Document
window.onload = function(){
	var frendsList = document.getElementById("frendsList"); 
	var titleName = document.getElementsByTagName('p');
	var allUl  = frendsList.getElementsByTagName('ul');
	var allLi  = frendsList.querySelectorAll('ul li');	
	//每一个标题做点击处理 用for循环
	for ( var i = 0 ; i < titleName.length; i++){
		 titleName[i].index = i; //用自定义属性 index存储标题的下标 0 1 2 
		 titleName[i].status = true; //自定义属性 每一个元素都是独立状态 都有自己的开关 通过开关来控制自己每次点击之后的状态  
		 titleName[i].onclick = function(){		
		 /*分析： 1， status = true 是闭合状态
		 		 2，status = false 是展开状态
				 初始的状态时闭合；
				  status = true 第一次点击的时候 执行for  并将status = false, 展开状态 
				                第二次点击的时候  执行else里的语句  并将status =true 	 闭合状态 	
		*/   
			if(this.status ){    //当前状态为真的时候
				for(var j=0 ; j < titleName.length ; j++){
					allUl[j].style.display="none";
					titleName[j].className = "";
					this.status = true;  //else操作的是当前的 for里操作的是所有的状态都要改
				}//for循环清空之前的设置的样式
				this.className = "red";//为真的时候 即第一次点击的时设置候背景颜色 找className
				allUl[this.index].style.display="block"; //第一次点击之后 ul是显示的状态 点击那个标题 其索引值index里的i 也在变，allUl里的下标跟标题的保持一致
				this.status = false;	//点击一次之后 改变标题的状态
			}else{  // else里是再次点击时候的样式设置
				this.className = "";
				allUl[this.index].style.display="none"; 
				this.status = true;	//改回最初的状态	
			}	 
		}
	}
	//设置每一个li的背景颜色  单独用一个for循环	此时获取的是所有的li 而不是单独获取的每个ul里的li（选项卡） 
	for(var k = 0 ; k <allLi.length; k++){
		allLi[k].bg=true;  //自定义属性  开关 通过开关来控制自己每次点击之后的状态 
		allLi[k].onclick = function(){
			if(this.bg){
				for(var n = 0 ; n <allLi.length; n++){
					allLi[n].style.background ="";//清空之前的li的背景颜色
					allLi[n].bg=true;
				}
				this.style.background = "yellow";//this指向的是触发当前事件的元素allLi[k]  给每一个li 赋值一个新的颜色
				this.bg = false;				
			}else{
				this.style.background ="";
				this.bg=true;
			}		
		} 
	}
	
}
