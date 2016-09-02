// JavaScript Document
window.onload = function(){
	//变量声明
	var setCssBtn =  document.getElementById("setCssBtn");
	var mask =  document.getElementById("mask");
	var cssBox =  document.getElementById("cssBox");		
	var changeBox =  document.getElementById("changeBox");
	var redColor = document.getElementById("redColor");
	var yellowColor = document.getElementById("yellowColor");
	var blueClor = document.getElementById("blueClor");
	var width200 = document.getElementById("width200");
	var width300 = document.getElementById("width300");
	var width400 = document.getElementById("width400");
	var height200 = document.getElementById("height200");
	var height300 = document.getElementById("height300");
	var height400 = document.getElementById("height400");
	var resetBtn  = document.getElementById("resetBtn");
	var sureBtn  = document.getElementById("sureBtn");
	//遮罩框和颜色宽高框
	setCssBtn.onclick = function(){
		mask.style.display = "block";
		cssBox.style.display = "block";
	}
	//颜色
	redColor.onclick = function(){
		changeBox.style.background = "red";
	}
	yellowColor.onclick = function(){
		changeBox.style.background = "yellow";
	}
	 blueClor.onclick = function(){
		changeBox.style.background = "blue";
	}
	
	//宽度
	function changeBoxWidth200(){
		changeBox.style.width = "200px";
	}		
	width200.onclick = changeBoxWidth200;		
	
	function changeBoxWidth300(){
		changeBox.style.width = "300px";
	}
	width300.onclick = changeBoxWidth300;	
	
	function changeBoxWidth400(){
		changeBox.style.width = "400px";
	}
	width400.onclick = changeBoxWidth400;
	//以上函数调用 宽度用的函数调用	
	//高度
	height200.onclick = function(){
		changeBox.style.height = "200px";
	}
	height300.onclick = function(){
		changeBox.style.height = "300px";
	}
	height400.onclick = function(){
		changeBox.style.height = "400px";
	}
	//按钮
	resetBtn.onclick = function(){
		changeBox.style.height = "100px";
		changeBox.style.width = "100px";
		changeBox.style.background = "#fff";
	}
	sureBtn.onclick = function (){
		mask.style.display = "none";
		cssBox.style.display = "none";
	}	
}
	