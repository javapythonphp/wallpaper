// JavaScript Document

var img1 = document.getElementById("backImg1");
var img2 = document.getElementById("backImg2");
var ImgTmp;
var len=10;
var isFirst = true;

function changeBackImg(){
	var src = backImgList[Math.floor(Math.random()*len)];
	img1.src=src;
	img2.style['opacity'] = 0;
	setTimeout(function(){
		img1.style['opacity'] = "1";
		img1.style['transform'] = "scale(1.2)";
		setTimeout(function(){
			img2.style['transform'] = "scale(1)";
			img2.src = backImgList[Math.floor(Math.random()*len)];
			ImgTmp = img2;
			img2 = img1;
			img1 = ImgTmp;
		},5000)
	},50)
	
}

window.onload = function(){
	
    setTimeout(function(){
		len = backImgList.length
		changeBackImg();
		setInterval(function(){
			changeBackImg();
		},12000)
	},2000)
	
	
}
