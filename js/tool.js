 function addJson(jsonbject1, jsonbject2) {
    var resultJsonObject={};
    for(var attr in jsonbject1){
        resultJsonObject[attr]=jsonbject1[attr];
    }
    for(var attr in jsonbject2){
        resultJsonObject[attr]=jsonbject2[attr];
    }
 
    return resultJsonObject;
};
//notice
var notice = function(obj){
	var opt = {
		content:"提示内容",
		timeOut:3000,
	}
	var option = typeof obj == "object" ? obj : {};
	var opts = addJson(opt,option);
	return notice.fn.init(opts);	
}
notice.fn = notice.prototype = {
	init : function(opts){
		this.html(opts);
	},
	html : function(opts){
		var div = document.createElement('div');
		div.setAttribute('id','slade');
		var span = document.createElement('span');
		span.innerHTML = opts.content;
		div.appendChild(span);
		var divWidth = div.offsetWidth;
		var divHeight = div.offsetHeight;
		div.style.cssText="position:fixed;top:50%;left:50%;margin-left:-"+ divWidth/2 +";margin-top:-"+ divHeight/2 +";background:rgba(0,0,0,.4);color:#fff;padding:10px 15px;font-size:16px;z-index:100;border-radius:15px;";
		var html='<div id="slade_notice" style="position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;background:rgba(0,0,0,.4);color:#fff;padding:5px 10px;font-size:16px;z-index:100;"><span>'+ opts.content +'</span></div>';
		document.getElementsByTagName('body')[0].appendChild(div);
		
		var node = document.getElementById('slade_notice');
		setTimeout(function(){
			node.style.display = "none";
			node.parentNode.removeChild(node);
		},opts.timeOut);
	},
}