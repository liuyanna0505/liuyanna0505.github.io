$(function(){
	var oCarousel = $('#Carousel')[0];
	var aImg = $('#Carousel img');
	var oPoint = $('#uor div');
	
	var num = 0 ;
	var W = aImg[0].offsetWidth;
	oCarousel.style.width = W*aImg.length +'px';
	
	var timer = 0;
	$('#our a').eq(0).addClass('present')
	timer = setInterval(function(){
		num++;
		if(num == aImg.length){
			aImg[0].style.position = 'static';
			oCarousel.style.left = 0;
			num = 1;
		}
		aImg[0].style.left = 0;
	    $('#Carousel').animate({ 
	       left: num*-W
	    }, 	500 );
//	    console.log(num,aImg.length)
		$('#our a').removeClass('present');
		if(num == aImg.length-1){
			$('#our a').eq(0).addClass('present');
//			alert(1)
		}else{
			$('#our a').eq(num).addClass('present');
			
		}
	},1500)
	
//	alert(W)
	
	
})
