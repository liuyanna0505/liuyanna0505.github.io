var tools = {
	getStyle:function (obj,attr){
		if( obj.currentStyle ){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];s
		}	
	},
	hasClass:function (element,classNames) {
		var classAll = 	element.className.split(" ");  //"blue red"
		for( var i = 0; i < classAll.length; i++ ){
			if( classAll[i] === classNames ){
				return true;
			}
		}
		return false;
	},
	removeClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){  //如果有这个class，就删除
			var classAll = element.className.split(" "); // ["blue","red"]
			for( var i = 0; i < classAll.length; i++ ){
				if( classAll[i] === classNames ){
					classAll.splice(i,1);
					i--;
				}
			}
			//如果这个数组为kong，那么就删除标签上的class这个属性
			if( classAll.length === 0 ){
				element.removeAttribute("class");
			}else{
				element.className = classAll.join(" ");
			}
			

		}
	},
	addClass:function (element,classNames){
		var classAll = element.className;  // ""    "blue"
		if( !tools.hasClass(element,classNames) ){
			classAll += " " + classNames;
		}
		element.className = classAll.trim();

	},
	toggleClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){
			tools.removeClass(element,classNames);
			return false;
		}else{
			tools.addClass(element,classNames);
			return true;
		}	
	}
}