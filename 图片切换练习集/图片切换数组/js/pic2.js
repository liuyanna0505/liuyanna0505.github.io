// JavaScript Document
window.onload =function(){
	var imgs =document.getElementById("imgs");
	var pre =document.getElementById("pre");
	var next =document.getElementById("next");
	
	var arr= ["baihe.jpg","Desert.jpg",'eye.jpg','juhua.jpg','ren.jpg'];
	var n = 0;
	//数组编号是从0开始
	next.onclick = function(){
		n= n+1;
		if( n > arr.length-1 ){
			//数组长度减1
			alert("最后一张了");			
			n = arr.length-1;			
			//图片个数有限；不写这个的话 点击一次 n就会加1，那么n就可以无限大，那么当执行往前走的时候 就会出错，找不到图片	
		}else{
			imgs.src ="img2/"+ arr[n];
		}		
	}
	pre.onclick = function(){
		n=n-1;
		if(n<0){
			alert("这是第一张");
			n=0;
			//图片个数有限，不写这个的话 点击一次 n就会减1，那么n就会为负值，那么当执行往后走的时候 就会出错，找不到图片 所以写上 n=0;
		}else{
			imgs.src ="img2/"+ arr[n];
		}
		
	}
	
}