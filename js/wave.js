// JavaScript Document
document.getElementsByTagName("body")[0].onclick = function(e) {	
	if(e.target.tagName=="CANVAS"){
		/*添加波纹效果*/		 
		var left = e.pageX;
		var top = e.pageY;
		var ii = document.createElement("div");
		ii.setAttribute("class","dot");  
		ii.setAttribute("style","top:"+top+"px;"+"left:"+left+"px");
		document.getElementsByTagName("body")[0].appendChild(ii); 
		setTimeout(function() {
			ii.parentNode.removeChild(ii);
		}, 1500);
	};
}