// JavaScript Documentvar

var musicAudio = document.getElementById("musicAudio");


var musicWaveSetup = (function(){
	
	var canvas,
		ctx,
		height,
		width,
		musicContext,
		mediaElement,
		analyser,
		musicData,
		barCount,
		barHeight,
		barWidth,
		imgOffX,
		imgOffY,
		isImgLoadNotFinish = true;

	function draw(){
		ctx.clearRect(0,0,width,height);
		ctx.drawImage(musicWave_img,imgOffX,imgOffY)
		analyser.getByteFrequencyData(musicData);
		var step = Math.round(musicData.length/barCount);
		for(var i=0;i<barCount;i++){
			var currentData = musicData[step*i];
			ctx.clearRect(barWidth*i,0,barWidth-1,300-currentData*0.8);
			ctx.clearRect(barWidth*i+barWidth-1,0,1,height);
		}
		move();
	}

	function initMusicDev(){
		 musicContext = new AudioContext();
		 mediaElement = musicContext.createMediaElementSource(musicAudio);
		 analyser = musicContext.createAnalyser();
		 mediaElement.connect(analyser);
		 analyser.connect(musicContext.destination);
		 musicData = new Uint8Array(analyser.frequencyBinCount);
	}

	function move(){
		if(imgOffX<=-3840){
			imgOffX = 0;
		}else{
			imgOffX -= 1;
		}
	}

	return {
		init:function(canvasId){
			 canvas = document.getElementById(canvasId);
			 ctx = canvas.getContext("2d");
			 canvas.height = height = 300;
			 canvas.width = width = 1920;
			 barCount = 100;
			 barWidth = 20;
			 barHeight = 300;
			 imgOffX = 0;
			 imgOffY = 0;

			 initMusicDev();

			 musicWave_img.onload = function(){
				 /*防止重复加载*/
				 if(isImgLoadNotFinish){
					isImgLoadNotFinish = false;
					setInterval(draw,20);
					move();	 
				 }
			 }

		}
	}
})();

musicWaveSetup.init("musicWave");