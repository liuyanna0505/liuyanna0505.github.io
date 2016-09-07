// JavaScript Document
window.onload = function(){
	var upperGroupBtn = document.getElementById("upperGroupBtn");
	var nextGroupBtn = document.getElementById("nextGroupBtn");
	var upperImgs = document.getElementsByClassName("upperImgs");
	var nextImgs = document.getElementsByClassName("nextImgs");
	var upperGroupImg = document.getElementsByClassName("upperGroupImg");
	var upperGroupPage = document.getElementsByClassName("upperGroupPage");
	var nextGroupImg = document.getElementsByClassName("nextGroupImg");
	var nextGroupPage = document.getElementsByClassName("nextGroupPage");
	var upperArr=['img/up1.png','img/up2.png','img/up3.png','img/up4.png'];	
	var nextgArr=['img/next1.png','img/next2.png','img/next3.png'];
	var onOff = true;	
	var n = 0;//控制第一组
	var i= 0; //控制第二组
	function leftChange(){
		upperImgs[0].src=upperArr[n];
		upperGroupImg[0].innerHTML='第一组第'+ (n+1) +'张';
		upperGroupPage[0].innerHTML=n+1 +'/'+upperArr.length;
	};
	function rightChange(){
		nextImgs[0].src=nextgArr[i];
		nextGroupImg[0].innerHTML='第二组第'+ (i+1) +'张';
		nextGroupPage[0].innerHTML=i+1 +'/'+nextgArr.length;
	};
	//函数直接调用		
	leftChange();  //初始状态  第一组的第一张
	rightChange();	//初始状态  第二组的第一张
	//左边的循环播放	
	upperImgs[0].onclick = function upperLoop(){
		n++;
		if( n > upperArr.length-1){
			n=0;			
		}
		leftChange();
	};
	//右边的循环播放
	 nextImgs[0].onclick = function nextLoop(){
		i++;
		if( i > nextgArr.length-1){
			i=0;			
		}
		rightChange();
	};	
	//组切换	 上一组切换
	upperGroupBtn.onclick = function(){
		 n--;		 
         i--;
        if( n <0 ){
            n=upperArr.length-1;
        }
        leftChange();
        if( i < 0){
            i=nextgArr.length-1;
        }
        rightChange();	 	 
	 }
	//下一组切换
	 nextGroupBtn.onclick = function(){
		 n++;		 
		 i++;
		if( n > upperArr.length-1){
			n=0;			
		}
		leftChange();
		if( i > nextgArr.length-1){
			i=0;			
		}	
		rightChange();	
	}	     	
}