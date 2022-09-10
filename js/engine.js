// JavaScript Document
var backImgList = new Array();
	window.wallpaperPropertyListener = {
		applyUserProperties: function(properties) {
			/*输入音量*/
			if (properties.volumn) {
				mrheight = properties.volumn.value;
			}
			/*频谱透明度*/
			if(properties.opacity){
				canvas.style['opacity'] = properties.opacity.value/100;
			}
			/*时钟透明度*/
			if(properties.opacityclock){
				document.getElementsByClassName("clock")[0].style.opacity = properties.opacityclock.value/100;
			}
			/*时钟xy坐标*/
			if(properties.pisitionXclock){
				document.getElementsByClassName("clock")[0].style.left = properties.pisitionXclock.value+"px";
			}
			if(properties.positionYclock){
				document.getElementsByClassName("clock")[0].style.top = 
				properties.positionYclock.value+"px";
			}
			/*锚点*/
			if(properties.maodianL){
				maodianLeft = properties.maodianL.value;
			}
			if(properties.maodianR){
				maodianRight = properties.maodianR.value;
			}
			/*图片流*/
			if(properties.backImgFolder){
				
			}
			/*文字颜色*/
			if(properties.fontColor){
				var str = properties.fontColor.value;
				var song = document.getElementsByClassName("nam")[0];
				var rgb = str.split(" ");
				var re = "rgb("+rgb[0]*256+","+rgb[1]*256+","+rgb[2]*256+")";
				$(song).children().children().css("color",re);
			}
			/*改频谱图片*/
			if(properties.pinpuImg){
				if(properties.pinpuImg.value){
					function upDatepinpupaper2(){
						/*取得文件名*/	
						var x = properties.pinpuImg.value;
						var re = "";
						for(var i=x.length-1;i>=0;i--){
							if(x[i]!="/"){
								re+=x[i]
							}
							else{
								break;
							}
						}
						var name = "";
						for(var i=re.length-1;i>=0;i--){
							name+=re[i];
						}
						/*新建img元素*/
						name = "picture/" + name;   
						let img2 = document.createElement("img");
						img2.setAttribute("src",name);
						img2.style['display'] = "none";
						img2.style['position'] = "absolute";
						/*图片加载好后新建填充，清除上一个，再重新循环*/
						img2.onload = function(){
							img = img2;
						}
					}
				upDatepinpupaper2();
				}
			}
			/*波纹颜色*/
			if(properties.bwcolor){
				var str = properties.bwcolor.value;
				var rgb = str.split(" ");
				var re = "rgba("+Math.round(rgb[0]*256)+","+Math.round(rgb[1]*256)+","+Math.round(rgb[2]*256)+",0.7)"
				var css = document.styleSheets[1];
				css.deleteRule(0);
				css.insertRule("@keyframes sploosh {0% {box-shadow: 0 0 0px 0px "+re+";opacity: 0.6;}100% {box-shadow: 0 0 10px 300px rgba(0, 0, 0, 0);opacity: 0;}}")
			}
			
		},	
		userDirectoryFilesAddedOrChanged : function(p, fileList) {
	    for(var i = 0; i < fileList.length; i++){
			backImgList.push("file:///" + fileList[i]);
			
		}
		len = fileList.length
	    
	}
}

