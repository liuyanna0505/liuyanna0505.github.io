// JavaScript Document
window.onload=function(){
	var ipBox = document.getElementById("ipBox");
	var ipBoxmess = document.getElementById("ipBoxmess");
	var sendBox = document.getElementById("sendBox");
	var spanIco = document.getElementById("spanIco");
	var textCon = document.getElementById("textCon");
	var sendMess = document.getElementById("sendMess");
	var imgs = document.getElementById("imgs");
	var user =  "张三";
	imgs.onclick =function(){
		if(user == "李四"){
			imgs.src = "img/dabing.png";
			user = "张三";
		}else{
			imgs.src = "img/tuhao.png";
			user = "李四";
		}
	}
	
	var classNames="zhangsan";
	sendMess.onclick =function(){
		var sendCon = textCon.value;//实时获取文本框里的内容
		if(user == "张三"){
			classNames = "zhangsan";
		}else{
			classNames = "lisi";
		}
		//此处的判断 两条可以写成一条
		ipBoxmess.innerHTML =ipBoxmess.innerHTML+ "<li class='"+classNames+" clearFix'>"+"<span>" +spanIco.innerHTML +"</span>" + "<span>"+sendCon +"</span>"+"</li>";	
		textCon.value ="";
	}	
		
	
}