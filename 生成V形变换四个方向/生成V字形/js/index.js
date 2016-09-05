// JavaScript Document
window.onload = function(){
	var btn = document.getElementById("btn");
	var ullist = document.getElementById("ullist");
	var ul_li = document.getElementsByTagName("li");
	btn.onclick = function(){
		ullist.style.display="none";
	}
	btn.onclick = function(){
		ullist.innerHTML ="";
		for(var i = 0; i < 5 ; i++){
			//ullist.innerHTML = ullist.innerHTML +'<li>'+ i +'</li>';
			if( i == 0){
					ullist.innerHTML = ullist.innerHTML +'<li style="left:0;top=0;">'+ i +'</li>';	
			}else if(i == 1){
					ullist.innerHTML = ullist.innerHTML +'<li style="left:50px;top:50px;">'+ i +'</li>';
			}else if(i == 2){
					ullist.innerHTML = ullist.innerHTML +'<li style="left:100px;top:100px;">'+ i +'</li>';
			}else if(i == 3){
					ullist.innerHTML = ullist.innerHTML +'<li style="left:150px;top:50px;">'+ i +'</li>';
			}else {
					ullist.innerHTML = ullist.innerHTML +'<li style="left:200px;top:0px;">'+ i +'</li>';
			}			
		}	
	}		
	
}