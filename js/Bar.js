// JavaScript Document
var AudioSong = document.getElementById("audio");
var progressBar = document.getElementsByClassName("progressBar")[0];
var currentBar = document.getElementsByClassName("currentBar")[0];
var curtxt=document.getElementById("currenttime");
var Alltxt=document.getElementById("duration");

function scrollChange(e){
    let off = getLeft(e);
    let realoffLeft = window.event.pageX-off;
    AudioSong.currentTime = AudioSong.duration*realoffLeft/295;
    currentBar.style['width'] = realoffLeft+"px";
}
function getLeft(e){
   let offset=e.offsetLeft;
   if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
   return offset;
}


function curtime(txt,music)
{
    if(music.currentTime<10)
    {
        txt.innerHTML="0:0"+Math.floor(music.currentTime);
    }
    else if(music.currentTime<60)
    {
        txt.innerHTML="0:"+Math.floor(music.currentTime);
    }
    else
    {
        var minet=parseInt(music.currentTime/60);
        var sec=music.currentTime-minet*60;
        if(sec<10)
        {
            txt.innerHTML="0"+minet+":"+"0"+parseInt(sec);
        }
        else
        {
            txt.innerHTML="0"+minet+":"+parseInt(sec);
        }
    }
}
/*歌曲全部时间*/
function AllTime(txt,music){
    txt.innerHTML = parseInt(music.duration/60)+":"+parseInt(music.duration%60);
}

setInterval(function(){
    currentBar.style['width'] = 295*AudioSong.currentTime/AudioSong.duration+"px";
	document.getElementsByClassName("circle")[0].style['left'] = 295*AudioSong.currentTime/AudioSong.duration+"px";
    AllTime(Alltxt,AudioSong);
    curtime(curtxt,AudioSong);
},35)
