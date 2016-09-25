/*-----------------运动函数----------------------------*/
/*
	函数参数： 
		obj         操作的元素
		attr        操作元素的属性
		duration    运动规定的时间
		target      运动的目标值 及元素要运动到的位置
		fx          运动形式函数
		callBack    回调函数		

*/
function FZ(obj,attr,duration,target,fx,callBack){
	var current = new Date().getTime();    //获取执行函数时的当前时间
	var b = parseInt(getComputedStyle(obj)[attr]); //获取要操作元素的属性 即运动的起始值
	var c = target - b; // 元素要运动到的目标值
	var d = duration;   //运动的持续时间
	clearInterval(obj.timer); //每次都清除前元素身上之前的定时器 保证只有一个定时器在起作用
	obj.timer = setInterval(function (){   //给当前元素设置定时器
		var t = new Date().getTime() - current;  //每隔16ms获取一次函数的当前时间  实时更新的时间 减去函数初始时候获取到的时间 就是元素已经运动的时间
		if( t >= d ){    //判断元素运动的时间和规定的持续时间 如果元素已经运动的时间大于了规定的时间的话 就停止定时器 并且让运动的时间回到规定的时间 保证运动到的位置=和目标值一致
			clearInterval(obj.timer); //清除了定时器 但是元素身上的编号还存在 且不变
			obj.timer =null;//清元素身上timer编号 停止运动之后，把timer设为空
			t = d;		//让元素运动的时间和规定的时间相等	
		}
		var value = Tween[fx](t, b, c, d);//判断是否有透明度
		if(attr ==='opacity'){
			obj.style[attr] = value;//透明度没有px
		}else{
			obj.style[attr] = value+ "px"; 
		}
		//obj.style[attr] = Tween[fx](t, b, c, d)+ "px"; //每个间隔时间过后元素的属性或者位置 或者宽高大小
		if( t === d ){  //当已经运动的时间和规定的时间一致的 时候 判断下回调函数的类型是函数类型的时候执行
			 typeof callBack === "function" && callBack();  //注：函数调回的位置
		}

	},16)
}
/*-----------------运动形式函数----------------------------*/
/*
  t : time 已过时间 
  b : begin 起始值
  c : count 总的运动值
  d : duration 持续时间
  */
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}