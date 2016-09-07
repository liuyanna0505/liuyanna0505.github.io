// JavaScript Document
window.onload =function(){
	var imgs =document.getElementById("imgs");
	var pre =document.getElementById("pre");
	var next =document.getElementById("next");
	var n = 1;
	//循环播放
	/*pre.onclick = function(){
		n = n-1;
		if( n < 1){
			n = 5;
			imgs.src ="img/"+ n +".jpg";//这个n也可以写成4
			//这两条写成imgs.src ="img/"+ 4 +".jpg" 就写死了 只执行一次;
		}else{
			imgs.src ="img/"+ n +".jpg";
		}
	}
	next.onclick=function(){		
		n = n+1;
		if(n > 5 ){
			n = 1;
		}		
		imgs.src ="img/"+ n +".jpg";
		
	}*/
	//顺序播放
	pre.onclick=function(){
		n = n-1;
		if( n<1 ){
			n=1;
			alert("第一张");
		} 
			imgs.src ="img/"+ n +".jpg";
		 //图片可以单独提出来
	}
	next.onclick=function(){		
		n = n+1;
		if(n > 5 ){
			n = 5;
			alert("最后一张");
		}else{		
			imgs.src ="img/"+ n +".jpg";
		}
		
	}
}