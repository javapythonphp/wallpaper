// JavaScript Document
/*currentSongIndex
  currentSong
  songListObject
  在musicPlayer.js
  */
function typePre(){
	currentSongIndex = currentSongIndex-1<0?songListName.length-1:currentSongIndex-1;
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
}

function typeNext(){
	currentSongIndex = currentSongIndex+1==songListName.length?0:currentSongIndex+1;
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
}

function typeRandom(){
	currentSongIndex = Math.floor(Math.random()*songListName.length);
	currentSong = songListObject.children[currentSongIndex].children[0];
	changeByTopButton(currentSong);
	songListObject.scrollTop = currentSong.offsetTop;
}

