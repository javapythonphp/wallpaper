
var AudioSong = document.getElementById("audio");
AudioSong.preload = "auto"
var progressBar = document.getElementsByClassName("progressBar")[0];
var currentBar = document.getElementsByClassName("currentBar")[0];
var curtxt=document.getElementById("currenttime");
var Alltxt=document.getElementById("duration");
var currentSong;
var currentSongIndex=0;
var songListObject;
var songListName = new Array();

function scrollChange(e){
    let off = getLeft(e);
    let realoffLeft = window.event.pageX-off;
    AudioSong.currentTime = AudioSong.duration*realoffLeft/250;
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

function PlayOrPause(t){
    toLargeBoreder(t);
    if(AudioSong.paused){
        AudioSong.play();
        t.innerHTML = "<i class=\"pause icon large\"></i>";
    }else{
        AudioSong.pause();
        t.innerHTML = "<i class=\"play icon large\"></i>";
    }
}

function PreSong(t){
	toLargeBoreder(t);
	currentSongIndex = currentSongIndex-1<0?songListName.length-1:currentSongIndex-1;
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
}

function NextSong(t){
	toLargeBoreder(t);
	currentSongIndex = currentSongIndex+1==songListName.length?0:currentSongIndex+1;
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
	
}

function RandomSong(t){
	toLargeBoreder(t);
	currentSongIndex = Math.floor(Math.random()*songListName.length);
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
}

function afterEnded(){
	
}

function toLargeBoreder(t){
    t.style['transform'] = "scale(1.2,1.2)"
    t.style['border-color'] = "red"
    setTimeout(function(){
        t.style['transform'] = "scale(1,1)"
        t.style['border-color'] = "black"
    },500)
}

setInterval(function(){
    currentBar.style['width'] = 250*AudioSong.currentTime/AudioSong.duration+"px";
	document.getElementsByClassName("circle")[0].style['left'] = 250*AudioSong.currentTime/AudioSong.duration+"px";
    AllTime(Alltxt,AudioSong);
    curtime(curtxt,AudioSong);
},100)
