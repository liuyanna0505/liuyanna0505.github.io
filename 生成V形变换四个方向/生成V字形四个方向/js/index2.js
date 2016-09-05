// JavaScript Document
window.onload = function(){
	var btnUp = document.getElementById("btnUp");
	var btnRight = document.getElementById("btnRight");
	var btnBottom = document.getElementById("btnBottom");
	var btnLeft = document.getElementById("btnLeft");
	var ullist = document.getElementById("ullist");
	var ul_li = ullist.getElementsByTagName("li");
	var num= 5; //奇数
	//分析：找分界点  四个方向的按钮 上下的按钮改变左设置一样，top值中间值处会改变 先大后小；左右的按钮top值的设置一致，left值在中间处设置会改变
	//向上按钮
	btnUp.onclick = function(){			    
			var str = "";//清空生成的li 这样每次点击的时候 之前生成的V 会消失
			for( var i = 0; i < num; i++ ){				
				if( i < Math.floor(num/2)+1 ){	// 0 1 2 
				//中间值是分界点 	向下取整		num是5的时候 此时取值是3	
					str += "<li style='left:"+(i*50)+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
				}else{					
					str += "<li style='left:"+(i*50)+"px;top:"+(num-1-i)*50+"px;'>"+(i+1)+"</li>";
				}			
			}
			ullist.innerHTML = str;
	};
	  //向下按钮
	btnBottom.onclick = function(){
		 var str = "";
			for( var i = 0; i < num; i++ ){				
				if( i < Math.floor(num/2)+1 ){					
					str += "<li style='left:"+(i*50)+"px;top:"+(num-1-i)*50+"px;'>"+(i+1)+"</li>";
				}else{					
					str += "<li style='left:"+(i*50)+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
				}			
			}
		ullist.innerHTML = str;
		 
	}
	//向右按钮
	btnRight.onclick = function(){			    
		var str = "";
		for( var i = 0; i < num; i++ ){				
			if( i < Math.floor(num/2)+1 ){					
				str += "<li style='left:"+(num-1-i)*50+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
			}else{					
				str += "<li style='left:"+(i*50)+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
			}			
		}
	   ullist.innerHTML = str;
	};
	//向左按钮
	btnLeft.onclick = function(){			    
		var str = "";
		for( var i = 0; i < num; i++ ){				
			if( i < Math.floor(num/2)+1 ){					
				str += "<li style='left:"+(i*50)+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
			}else{					
				str += "<li style='left:"+(num-1-i)*50+"px;top:"+(i*50)+"px;'>"+(i+1)+"</li>";
			}			
		}
	   ullist.innerHTML = str;
	};
		
}	