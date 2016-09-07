// JavaScript Document
window.onload =function(){
	var imgs =document.getElementById("imgs");
	var pre =document.getElementById("pre");
	var next =document.getElementById("next");	
	var arr= ["baihe.jpg",'Desert.jpg','eye.jpg','juhua.jpg','ren.jpg'];
	var n = 0;//数组的编号/下标是从0开始的 n值最大是 arr.length-1
	//图片往左走
	pre.onclick = function(){
		n = n-1;
		if( n < 0){//下标为界限
			n = arr.length-1;//n是从0开始，n的取值是从arr.length数组长度 需要-1，
			//图片个数不定，n = arr.length-1
			imgs.src ="img2/"+  arr[n];//显示的是最后一张图片			
		}else{
			imgs.src ="img2/"+ arr[n];
		}
	}
	//图片往右走
	next.onclick=function(){		
		n = n+1;
		if(n > arr.length-1){//最大的下标值
			n = 0;
		}	
		//图片个数有限；不写这个的话 点击一次 n就会加1，那么n就可以无限大，那么当执行往前走的时候，找不到图片	 就会出错
		imgs.src ="img2/"+ arr[n];		
	}
}