window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if(properties.opacity){
            document.getElementById("musicWave").style['opacity'] = properties.opacity.value/100;
        }
        if(properties.musicImg){
            document.getElementById("musicWave_img").src="file:///"+properties.musicImg.value;
        }
        if(properties.wavecolor){
            var str = properties.wavecolor.value;
            var rgb = str.split(" ");
            var re = "rgba("+Math.round(rgb[0]*256)+","+Math.round(rgb[1]*256)+","+Math.round(rgb[2]*256)+",0.7)"
            var css = document.styleSheets[1];
            css.deleteRule(0);
            css.insertRule("@keyframes wave {0% {box-shadow: 0 0 5px 2px "+re+";opacity: 0.9;}100% {box-shadow: 0 0 10px 200px rgba(0, 0, 0, 0);opacity: 0;}}")
        }
        if(properties.lrccolor){
            var str = properties.lrccolor.value;
            var rgb = str.split(" ");
            var re = "rgba("+Math.round(rgb[0]*256)+","+Math.round(rgb[1]*256)+","+Math.round(rgb[2]*256)+",0.7)"
            showlrcSetup.changeColor(re)
        }
        if(properties.timecolor){
            var str = properties.timecolor.value;
            var rgb = str.split(" ");
            var re = "rgba("+Math.round(rgb[0]*256)+","+Math.round(rgb[1]*256)+","+Math.round(rgb[2]*256)+",0.7)"
            particleTimeSetup.changeColor(re)
        }
        if(properties.showTime){
            particleTimeSetup.isShow(properties.showTime.value)
        }
        if(properties.showLrc){
            showlrcSetup.isShow(properties.showLrc.value)
        }
    },
    userDirectoryFilesAddedOrChanged : function(p, fileList) {
        if(p=="backImgFolder"){
            flow_array = new Array();
            for(var i = 0; i < fileList.length; i++){
                flow_array.push("file:///" + fileList[i]);
            }
        }
    }
}
