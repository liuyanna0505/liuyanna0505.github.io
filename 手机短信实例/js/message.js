// JavaScript Document
window.onload =function(){
	var ipBox = document.getElementById("ipBox");
	var ipBoxmess = document.getElementById("ipBoxmess");
	var sendBox = document.getElementById("sendBox");
	var spanIco = document.getElementById("spanIco");
	var textCon = document.getElementById("textCon");
	var sendMess = document.getElementById("sendMess");
	var imgs = document.getElementById("imgs");
	var onOff = true;//初始值 全局变量  下面的要是变了 这个就会被覆盖
	//初始值是true 此时是dabing图片
	//console.log(imgs);
	imgs.onclick = function(){
		console.log(imgs);//调试显示的是tuhao.png 
		//行间设置的初始图片是 dabing.png
		if(onOff){  //onOff为真 是dabing false是tuhao
			imgs.src="img/tuhao.png";
			onOff = false;
		}else{
			imgs.src="img/dabing.png";
			onOff = true;
		}
		//console.log(imgs);
		//图片的切换  开关判断，不管初始行间图片是怎样的
	}
	sendMess.onclick =function(){
		var sendCon = textCon.value;		
		if(textCon.value==""){
			alert("请输入内容");
		}else if(onOff){// 如果图片点击开关变化 此处的onOff 根据上面的来变
		ipBoxmess.innerHTML =ipBoxmess.innerHTML+ "<li class='clearFix' style='margin:4px 0;'>"+"<span style='float:left;margin-right:6px;'>" +spanIco.innerHTML /*"<img src="img/dabing.png">"此法错误，把图片固定死了*/+"</span>" + "<span style='float:left;max-width:180px;background:#ded6e7;word-break:break-all;'>"+sendCon +"</span>"+"</li>";	
		//max-width:180px;word-break:break-all   换行
		}else{
		ipBoxmess.innerHTML += "<li class='clearFix' style='margin:4px 0;'>"+"<span style='float:right;'>" +spanIco.innerHTML +"</span>" + "<span style='float:right;max-width:180px;background:#21c618;word-break:break-all;margin-right:6px;'>"+sendCon +"</span>"+"</li>";	 
		}
			textCon.value="";
		//如果先不执行图片的点击操作，直接操作发送的话 初始获取的是行间的样式 ，这样发送的图片就是初始的行间的图片，会出问题
		//发送文字的切换
	}
	
}