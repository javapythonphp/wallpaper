// JavaScript Document
/*
var currentSong;
var currentSongIndex;
var songListObject
在musicPlayer*/


function showOrhideSongList(t){
	var list = t.parentElement.getElementsByClassName("nam")[0];
	$(list).toggleClass("trans");
	var arrow = t.getElementsByClassName("arrow")[0];
	$(arrow).toggleClass("trans");
}

function initchange(t){
	currentSong = t;
	currentSongIndex = $(t).parent().index();
	
	$(t).parent().siblings().children().removeClass("bounder");
	$(t).addClass("bounder")
	
	$(t).parent().siblings().removeClass("trans");
	$(t).parent().addClass("trans");
	
	document.getElementById("audio").setAttribute("src",t.dataset.url);
	
	document.getElementById("audio").play();
	
	document.getElementsByClassName("lyric")[0].innerHTML = t.innerHTML;
	
	document.getElementsByClassName("PlayOrPause")[0].innerHTML = "<i class=\"pause icon large\"></i>";
	
}

function change(t){
	currentSong = t;
	currentSongIndex = $(t).parent().index();
	
	$(t).parent().siblings().children().removeClass("bounder");
	$(t).addClass("bounder")
	
	$(t).parent().siblings().removeClass("trans");
	$(t).parent().addClass("trans");
	
	document.getElementById("audio").setAttribute("src","CloudMusic/"+t.innerHTML);
	
	document.getElementById("audio").play();
	
	document.getElementsByClassName("lyric")[0].innerHTML = t.innerHTML;
	
	document.getElementsByClassName("PlayOrPause")[0].innerHTML = "<i class=\"pause icon large\"></i>";
}

function changeByTopButton(t){
	if(t.dataset.url==undefined){
		$(t).parent().siblings().children().removeClass("bounder");

		$(t).parent().siblings().removeClass("trans");
		$(t).parent().addClass("trans");

		document.getElementById("audio").setAttribute("src","CloudMusic/"+t.innerHTML);

		document.getElementById("audio").play();

		document.getElementsByClassName("lyric")[0].innerHTML = t.innerHTML;
		
		document.getElementsByClassName("PlayOrPause")[0].innerHTML = "<i class=\"pause icon large\"></i>";
	}else{
		initchange(t)
	}
	
	
}
