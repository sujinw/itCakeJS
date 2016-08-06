/*
 *自己用的js库
 */
;(function(){
	var _it = window.it;
	var _It = window.It;
	var _$ = window.$;
	//暴露外部使用的一个接口
	var It = window.It = window.it= window.$=window._ = function(selector,context){

		return new It.fn.init(selector,context);
	};
	//处理原型对象
	It.fn = It.prototype = {
		init:function(selector,context){
			var elements = this.selector(selector,context);
			Array.prototype.push.apply(this,elements);
			return this;	
		},
		It:"1.0.0",
		length:0,
		size:function(){
			return this.length;
		}

	};
	It.fn.init.prototype = It.fn;

	//实现继承,并且只处理只有一个参数，也就是插件的扩展
	It.extend = It.fn.extend = function(){
		var o = arguments[0];
		for(var p in o){
			this[p] = o[p];
		}
	};

	//添加静态方法
	It.extend({
		trim:function(text){
			return (text||"").replace(/^\s+|\s+$/g,"");
		},
		noConflict:function(){//解决$，it,It,冲突
			window.it = _it;
			window.It = _It;
			window._$ = $;
			return It;
		}
	});

	//添加实例方法
	It.fn.extend({
		selector:function(selector,context){
			// 已实现：
			// $('#div1') ID选择器 （直接返回对象）
			// $('.aCur') 类选择器
			// $('div') 元素选择器
			// $('#div1 li') 组合选择器
			// $('input[type=text]:checked') 属性值选择器
			// $('a', myDiv) 选择myDiv下的所有a元素
			// /*********************************************/

			// //q查询表达式 o父对象
			// function $(q, o){
    //debugger;
    //查询表达式必须为字符串，并且不能为空。
	    if(typeof(selector)!=='string' || selector == '') return [];
	    
	    //使用空格分割，只处理第一个表达式
	    var arg = selector.split(' ');
	    
	    //获取属性
	    var attr = '';
	    var s = arg[0].split(':')[0];
	    if(s != arg[0])
	        attr = arg[0].split(':')[1];
	    
	    var val = s.split('[')[0];
	    if(val != s)
	        val = s.split('[')[1].replace(/[",\]]/g,'');
	    else
	        val = '';
	    s = s.split('[')[0];
	    
	    var obj = [];
	    var sObj = null;
	    //当父对象不存在时，使用document;
	    context = context || document;
	    switch(s.charAt(0))
	    {
	        case '#':
	            //ID选择器
	            sObj = document.getElementById(s.substr(1));
	            if(sObj)obj.push(sObj);
	            break;
	        case '.':
	            //类选择器
	            var l = context.getElementsByTagName('*');
	            var c = s.substr(1);
	            for(var i=0; i<l.length; i++)
	            if(l[i].className.search('\\b' + c + '\\b')!=-1){
	            	obj.push(l[i]);
	            }
	            break;
	        default:
	            //根据tag获取元素
	            obj = context.getElementsByTagName(s);
	            break;
	    }
	    if(val)
	    {
	        //[t=val]筛选属性匹配
	        var l = [];
	        var a = val.split('=');
	        for(var i=0; i<obj.length; i++){
	            if(a.length == 2 && obj[i][a[0]] == a[1]) {
	            	l.push(obj[i]);
	            }
	        }
	        obj = l;
	    }
	    if(attr)
	    {	
	        //: 筛选属性匹配
	        var l = [];
	        for(var i=0; i<obj.length; i++){
	            if(obj[i][attr]) {
	            	l.push(obj[i]);
	            }
	        }
	        obj = l;
	    }    
	    
	    if(arg.length > 1)
	    {
	        //递归处理表达式后续内容
	        //父元素为已获取的所有元素
	        var l = [];
	        for(var i=0; i<obj.length; i++){
	            var ll = arguments.callee(selector.substr(arg[0].length+1), obj[i]);
	            if(ll.tagName) l.push(ll);
	            else
	            for(var j=0; j<ll.length; j++)l.push(ll[j]);
	        }
	        obj = l;
	    }
	    
	    if(sObj && arg.length == 1){
	        //当为ID选择器时，直接返回对象。
	        obj=sObj;
	        if(obj)obj.length = 1;
	    } else {
	        //去除数组中重复元素
	        var l = [];
	        for(var i=0; i<obj.length; i++)obj[i].$isAdd = false;
	        for(var i=0; i<obj.length; i++){
	            if(!obj[i].$isAdd){
	                obj[i].$isAdd = true;
	                l.push(obj[i]);
	            }
	        }
	        obj = l;
	    }
	    
	    return obj;
		},
		get:function(num){
			return this[num];
		},
		each:function(fn){
			for(var i = 0 ;i< this.length; i++){
				fn(i,this[i]);
			}
			return this;
		},
		css:function(){
			var l = arguments.length;
			if(l == 1 && typeof arguments != 'object'){
				return this[0].style[arguments[0]];
			} else {
				if(typeof arguments == 'object'){

					for(var k in arguments[0]){

						var name = k;
						var value = arguments[0][k];
						this.each(function(index,ele) {
							ele.style[name] = value;
						});
					}
					
				}else{
					var name = arguments[0];
					var value = arguments[1];
					this.each(function(index,ele) {
						ele.style[name] = value;

					});
				}
			}
			return this;
		}
	});
})();