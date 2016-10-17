var tools = (function() {
	var toolsObj = {
		//获取元素
		$: function(selector, context) {
			context = context || document;
			if(selector.indexOf(" ") !== -1) {
				return context.querySelectorAll(selector);
			} else if(selector.charAt(0) === "#") {
				return document.getElementById(selector.slice(1))
			} else if(selector.charAt(0) === ".") {
				return context.getElementsByClassName(selector.slice(1));
			} else {
				return context.getElementsByTagName(selector);
			}
		},
		//可视窗口
		view: function() {
			return {
				W: document.documentElement.clientWidth,
				H: document.documentElement.clientHeight
			}
		},
		//事件绑定
		addEvent: function(obj, evName, fnName) {
			obj.addEventListener(evName, fnName, false);
		},
		removeEvent: function(obj, evName, fnName) {
			obj.removeEventListener(evName, fnName, false);
		},
		addClass: function(element, clsNames) {
			if(typeof clsNames === "string") {
				if(!tools.hasClass(element, clsNames)) {
					element.className += " " + clsNames;
				}
			}
		},
		removeClass: function(element, clsNames) {
			var classNameArr = element.className.split(" ");
			for(var i = 0; i < classNameArr.length; i++) {
				if(classNameArr[i] === clsNames) {
					classNameArr.splice(i, 1);
					i--;
				}
			}
			element.className = classNameArr.join(" ");
		},
		hasClass: function(ele, classNames) {
			var classNameArr = ele.className.split(" ");
			for(var i = 0; i < classNameArr.length; i++) {
				if(classNameArr[i] === classNames) {
					return true;
				}
			} 
		},
		toggleClass: function(ele, classNames) {
			if(tools.hasClass(ele, classNames)) {
				tools.removeClass(ele, classNames);
				return false;
			} else {
				tools.addClass(ele, classNames);
				return true;
			}
		},
		//事件委托 找到父节点
		parents: function(element, selector) { //元素和class id名
			var first = selector.charAt();
			if(first === "#") {
				selector = selector.slice(1);
				while(element.nodeType != 9 && element.id != selector) { //当前这个元素的id不为box
					element = element.parentNode;
				}
			} else if(first === ".") {
				selector = selector.slice(1);
				while(element.nodeType != 9 && !tools.hasClass(element, selector)) { //当前这个元素的id不为box
					element = element.parentNode;
				}
			} else {
				while(element.nodeType != 9 && element.nodeName.toLowerCase() != selector) { //当前这个元素的id不为box
					element = element.parentNode;
				}
			}
			return element.nodeType === 9 ? null : element;
		},
		getTreeById: function(classNams, id, parents) {
			var classElement = tools.$("." + classNams, parents);
			for(var i = 0; i < classElement.length; i++) {
				if(classElement[i].dataset.fileId == id) {
					return classElement[i];
				}
			}
			return null;
		},
		uuid: function() {
			return new Date().getTime();
		}
	}
	return toolsObj;
})();