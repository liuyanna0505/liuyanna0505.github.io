
var num=0;//计数，用来切换页数
var onOff=true;//防止多次滑动造成错乱

/*初始化第一页对应小圆点高亮*/
renderPage();
/*点击btn按钮*/
$("#btn").click(function(){
	num=1;
})
/*右侧导航的点击事件*/
$('#right-side-bar a').click(function(){
	if(!onOff)return;
	onOff=false;
	num=$(this).index();
	renderPage();
});
/*鼠标滚动触发的事件*/
mScroll(document,function(){//向上滚动
	if(!onOff)return;
	onOff=false;
	num--;
	if(num<0){//向上滚动到第一页 停留在第一页
		num=0;
		onOff=true;
		return;
	}
	renderPage();
},function(){//向下滚动
	if(!onOff)return;
	onOff=false;
	num++;
	if(num>3){//向下滚动到最后一页 返回第一页
		num=0;
	}
	renderPage();
});
/*封装滚轮函数，区别滚轮事件是firefox还是chrom  */
/*火狐(event.detail > 0 ? "mousedown" : "mouseup"   谷歌：(event.wheelDelta > 0 ? "mouseup" : "mousedown")*/
function mScroll(obj,upper,down){
	obj.addEventListener('DOMMouseScroll', fn, false);//火狐
	obj.onmousewheel  = fn;//谷歌ie
	function fn(ev){
		var n;/*负数代表向下，正数是向上，n就是这个数字*/
		if(ev.detail){
			n = -ev.detail;//firefox
		}else{
			n = ev.wheelDelta;//ie和chrome
		}
		//n小于0向下滚动，否则向上。
		if(n<0){
			down();
		}else{
			upper();
		}
	}
}
/*封装函数改变页,渲染相应小圆点面*/
function renderPage(){
	$("#right-side-bar a").removeClass('on').eq(num).addClass('on');//右侧小圆点
	$(".page").fadeOut().eq(num).fadeIn(600,function(){//当前页面的出现
		onOff=true;
	});
}