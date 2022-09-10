// JavaScript Document
/*频谱代码*/			
var canvas = document.getElementById("canvas");
var img = document.getElementById("img")
var pen = canvas.getContext('2d');
canvas.width = "1920";
canvas.height = "300";


var context = new AudioContext();
var meiti = context.createMediaElementSource(AudioSong);
var fenxiqi = context.createAnalyser();
meiti.connect(fenxiqi);
fenxiqi.connect(context.destination);
var pinpu = new Uint8Array(fenxiqi.frequencyBinCount);

var mrcount = 100;
var bc = 20;
var mrheight = 90;	
var maodianLeft = 0;
var maodianRight = 0;

function draw(){
	pen.clearRect(0,0,1920,300);
	pen.drawImage(img,-maodianLeft,-maodianRight);
	fenxiqi.getByteFrequencyData(pinpu);
	var n = Math.round(pinpu.length/mrcount);
	for(var i=0;i<mrcount;i++){
		var len = pinpu[n*i];
		pen.clearRect(bc*i,0,bc-1,300-(len*mrheight/100));
		pen.clearRect(bc*i+bc-1,0,1,300);
	}		
}

img.onload = function(){
	setInterval(function(){				
			draw();
	
	},25)
	
	setInterval(function(){
		if(maodianLeft>=3840){
			maodianLeft = 0;
		}
		maodianLeft+=1;
	},25)
}// JavaScript Document
