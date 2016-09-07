// JavaScript Document
window.onload = function(){
	var loop = document.getElementById("loop");
	var order = document.getElementById("order");
	var descripe = document.getElementById("descripe");
	var imgs = document.getElementById("imgs");
	var pre = document.getElementById("pre");
	var text = document.getElementById("text");
	var pages = document.getElementById("pages");
	var n = 0;//记录下标
	var onOff = false;//记录是循环播放还是顺序
	var arr = ["baihe.jpg","Desert.jpg",'eye.jpg','juhua.jpg','ren.jpg'];//数组存放图片的地址
	var arr2 = ["百合","沙漠","视野","菊花","人物"];//存放图片的标题
	pages.innerHTML = "1/"+arr.length; //程序运行的时候，就去统计总共有多少张图
	
	loop.onclick=function(){//点击循环播放
		onOff=false;
		descripe.innerHTML="循环播放";
	}
	order.onclick = function(){
		onOff=true; 
		descripe.innerHTML="顺序播放";
	}
	//声明函数				
	function fn(){
		imgs.src ="img/"+ arr[n];//图片地址链接		
		text.innerHTML= arr2[n];//标题
		pages.innerHTML =n+1+"/"+arr.length;//页数 从1开始
	}	
	//函数存放代码块
	 fn();	//函数调用 	 此时改变n值 可以变换初始图片是哪张****
	 //往左
	pre.onclick = function(){
		n=n-1; 
		if(n<0){//走到边界处的时候判断下是循环还是顺序
			if(onOff==false){
				n = arr.length-1;//循环
			}else{
			  n=0;
			  alert("这是第一张");//顺序
			}								 
		 }	
		 fn();	//调用位置 是if执行完之后	就是所有n 都会有这种函数里的样式
	}
		//往右
	next.onclick = function(){
		n= n+1;
		if( n > arr.length-1 ){
			if(onOff==false){
				n=0;//循环
			}else{
				n=arr.length-1;
				alert("最后一张了");	//顺序				
			}
		}			
		fn();
	}
}
	
	
	//顺序播放
	  /*pre.onclick = function(){
			n=n-1;
			if(n<0){
				n=0;
				alert("这是第一张");			
			}else{
				imgs.src ="img/"+ arr[n];
				text.innerHTML= arr2[n];
				pages.innerHTML =n+1+"/"+arr.length;
			}
		}
		next.onclick = function(){
			n= n+1;
			if( n > arr.length-1 ){
				alert("最后一张了");			
				n = arr.length-1;
			}else{
				imgs.src ="img/"+ arr[n];
				text.innerHTML= arr2[n];
				pages.innerHTML =n+1+"/"+arr.length;
			}		*/
	//循环播放
	/*
	pre.onclick=function(){
		n = n-1;
		if( n < 0){
			n = arr.length-1;				
		}
		imgs.src ="img/"+ arr[n];		
		text.innerHTML= arr2[n];
		pages.innerHTML =n+1+"/"+arr.length;
		
	}
	next.onclick=function(){		
		n = n+1;
		if(n > arr.length-1){
			n = 0;
		}		
		imgs.src ="img/"+ arr[n];		
		text.innerHTML= arr2[n];
		pages.innerHTML =n+1+"/"+arr.length;}*/
	
