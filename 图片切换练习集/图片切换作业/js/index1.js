// JavaScript Document
//此方法代码繁琐。。。。。。
window.onload = function(){
	var loop = document.getElementById("loop");
	var order = document.getElementById("order");
	var descripe = document.getElementById("descripe");
	var imgs = document.getElementById("imgs");
	var pre = document.getElementById("pre");
	var text = document.getElementById("text");
	var pages = document.getElementById("pages");
	var n = 0;
	var arr = ["baihe.jpg","Desert.jpg",'eye.jpg','juhua.jpg','ren.jpg'];
	var arr2 = ["百合","沙漠","视野","菊花","人物"];
	pages.innerHTML = "1/"+arr.length;		
	function fn(){
		imgs.src ="img/"+ arr[n];		
		text.innerHTML= arr2[n];
		pages.innerHTML =n+1+"/"+arr.length;
	}	
	//函数存放代码块	 
	fn();	//函数调用	 
	pre.onclick=function(){
		n = n-1;
		if( n < 0){
			n = arr.length-1;				
		}
		fn();			
	}
	next.onclick=function(){		
		n = n+1;
		if(n > arr.length-1){
			n = 0;
		}		
		fn();	
	}
		//以上是默认状态是循环切换		
	//点击循环按钮
	loop.onclick=function loop(){
		descripe.innerHTML="循环播放";
		pre.onclick=function(){
			n = n-1;
			if( n < 0){
				n = arr.length-1;				
			}
		 fn();			
		}
		next.onclick=function(){		
			n = n+1;
			if(n > arr.length-1){
				n = 0;
			}		
		 	fn();	
	    }		
	}	
	//顺序播放
	order.onclick = function order(){
		descripe.innerHTML="顺序播放";
		pre.onclick = function(){
			n=n-1;
			if(n<0){
				n=0;
				alert("这是第一张");			
			} 
			fn();				 
		}
		next.onclick = function(){
			n= n+1;
			if( n > arr.length-1 ){
				alert("最后一张了");			
				n = arr.length-1;
			} 
			fn();				 
		}	
	}	
}