// JavaScript Document
var showlrcSetup = (function(){

    var canvas,
        ctx,
        particles = [],
        height,
        width,
        textSize,
        text,
        maxCount,
        speed,
        color;

    var getTimeData = function(){
        ctx.clearRect(0,0,width,height);
        ctx.font = textSize + "px 'Avenir', 'Helvetica Neue', 'Arial', 'sans-serif'";
        text = currentLrcLine;

        ctx.fillText(text,0,height/1.2);

        var data = ctx.getImageData(0,0,width,height).data;
        ctx.clearRect(0,0,width,height);
        filterData(data);
    }

    var filterData = function(data){
        var pxls = [];
        for(var i=width-1;i>0;i-=3){
            for(var j=0;j<height;j+=2){
                if(data[((i+j*width)*4)+3]>50){
                    pxls.push([i,j]);
                }
            }
        }
        var reCount = pxls.length<particles.length?pxls.length:particles.length;
        var count = pxls.length
        for(var w=0;w<reCount;w++){
            var item = particles[w];
            var offX = pxls[count-1][0] - item.nowX;
            var offY = pxls[count-1][1] - item.nowY;
            var distance = Math.sqrt(offX*offX+offY*offY);
            var arcTan = Math.atan2(offY,offX);
            var cos = Math.cos(arcTan);
            var sin = Math.sin(arcTan);

            item.nextX = item.nowX + cos * distance * speed;
            item.nextY = item.nowY + sin * distance * speed;
            item.nowX = item.nextX;
            item.nowY = item.nextY;

            count--;

            draw(item)
        }
    }

    var draw = function(item){
        ctx.fillStyle = color ;
        ctx.beginPath();
        ctx.arc(item.nowX,item.nowY,item.radius,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
    }

    var Particle = function(){
        this.nowX = Math.random()*width;
        this.nowY = Math.random()*height;
        this.nextX = 0;
        this.nextY = 0;
        this.radius = Math.random()+0.8;
    }

    var clearParticles = function(){
        particles = [];
        for(var i=0;i<maxCount;i++){
            particles.push(new Particle());
        }
    }

    return {
        init:function(canvasId){
            canvas = document.getElementById(canvasId);
            ctx = canvas.getContext("2d");
            canvas.width = width = 1300;
            canvas.height = height = 100;
            speed = 0.15;
            textSize = 60;
            maxCount = 3000,
            color = "rgba(255,255,255,0.6)"

            clearParticles();

            getTimeData();

            setInterval(function(){
                getTimeData();
            },40);
        },
        changeColor(color2){
            color = color2
        },
        isShow(flag){
            if(flag){
                canvas.style['display'] = "block";
            }else{
                canvas.style['display'] = "none";
            }
        }
    }

})();

showlrcSetup.init("showlrc");
