// JavaScript Document
window.onload = function(){
	var btn = document.getElementById("btn");
	var ullist = document.getElementById("ullist");
	var ul_li = ullist.getElementsByTagName("li");
	var n = 5;//方块的个数
	btn.onclick = function(){
		ullist.innerHTML ="";
		//点击一次清空之前的li
		for(var i = 0; i < n ; i++){
			ullist.innerHTML +="<li>"+ i +"</li>";
			//生成li V字形需要i是奇数 
		}
		for(var i = 0; i < ul_li.length ; i++){
			ul_li[i].style.left = i*50 + "px"; 
			//下标从0开始 i取值：0 1 2  3  4  顶部的位置是 0 50 100 50 0 
			if( i < Math.floor(ul_li.length /2)){  //向下取整
				ul_li[i].style.top = i*50 + "px";
				//i取值 0 1 2 
			}else{
				ul_li[i].style.top = (ul_li.length-1-i)*50 + "px";	
				//中位数之后的顶部位置设置 i取值 3 4， 因为此时ul_li.length-i的结果值与if取到的最大i 即2相等， 但是此时li 的位置相对2来说位置上升了一个50 所以需要再减1；
			}			 
		}
	}
	ullist.onclick = function(){
		this.style.display= "none";
	}
	
}	