// JavaScript Document
var lyric = document.getElementsByClassName("lyric")[0];
lyric.setAttribute("class","lyric flow")
setInterval(function(){
	lyric.setAttribute("class","lyric");
	setTimeout(function(){
		lyric.setAttribute("class","lyric flow");
	},200)
},26000);