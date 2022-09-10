// JavaScript Document
/*储存当前歌词*/
var currentLrcArray = new Array();
var currentLrcLine = "none";
	$(document).ready(function(){
			/*先停止旋转动画*/
			$(".top_img")[0].style.animationPlayState = "paused";

			var audio = document.getElementById("musicAudio");
			var $music_player = $("#music_player");
			var $music_list = $(".musicList");
			var $music_item = $(".item");
			/*保存item模板*/
			var itemModule = $music_item.remove();
			var $progress = $(".progress");
			var $progressNow = $(".progressNow");
			var $bar = $progress.find(".icon");
			/*歌曲列表总长*/
			var songLength = 0;
			var nowPlay = 0;
			/*歌曲当前时长/总时长*/
			var duration = 0;
			var songduration = 0;
			/*显示列表*/
			$music_player.addClass("trans")

			audio.onended = function(){
				nowPlay = nowPlay==songLength-1?0:nowPlay+1;
				changeByIndex(nowPlay)
			}

/*进度条操作*/
			/*进度条点击/拖动效果*/
			/*取得bar全长，好取比例*/
			var maxw = $progress.width();
			/*取得当前进度条长*/
			var w;
			$progress.bind("mousedown",function(e){
				e.stopPropagation();
				if(e.target.className!="icon"){
				   w = e.offsetX;
				   $progressNow.width(w);
				   updateDuration(w,$progress.width());
				}
			})
			$bar.bind("mousedown",function(e){
				e.stopPropagation();
				var left1 = getLeft($progress[0]);
				var maxw = $progress.width();
				var mouseLeft1 = e.clientX;
				$progressNow.width(mouseLeft1-left1);
				console.log(mouseLeft1-left1)
				$(document).bind("mousemove",function(ee){
					var mouseLeft = ee.clientX;
					w = mouseLeft - left1;
					if(w>0&&w<maxw){
						$progressNow.width(w);
						updateDuration(w,maxw);
					}
					console.log(w)
				})
			})
			$(document).bind("mouseup",function(e){
				$(this).unbind("mousemove");

			})
			function getLeft(ele){
				var re = ele.offsetLeft;
				if(ele.offsetParent!=null){
					re += getLeft(ele.offsetParent);
				}
				return re;
			}
			/*进度条拖动后歌曲变化*/
			function updateDuration(data1,data2){
				audio.currentTime = audio.duration * (data1/data2)
			}
/*顶部按钮逻辑*/
			/*按钮效果*/
			var play_left = $(".play_left");
			var play_pause = $(".play_pause");
			var play_right = $(".play_right");
			play_pause.bind("click",function(e){
				if(audio.paused){
					beginMusic();
					$(this).addClass("trans");
					setTimeout(()=>{
						$(this).removeClass("trans");
					},300)
				}else{
					pauseMusic();
					$(this).addClass("trans");
					setTimeout(()=>{
						$(this).removeClass("trans");
					},300)
				}

			})
			play_left.bind("click",function(e){
				/*变换*/
				$(this).addClass("trans");
				/*变换返回*/
				setTimeout(()=>{
					$(this).removeClass("trans");
				},300);
				/*上一首*/
				nowPlay = nowPlay==0?songLength-1:nowPlay-1;
				changeByIndex(nowPlay)
			})
			play_right.bind("click",function(e){
				$(this).addClass("trans");
				setTimeout(()=>{
					$(this).removeClass("trans");
				},300);
				/*下一首*/
				nowPlay = nowPlay==songLength-1?0:nowPlay+1;
				changeByIndex(nowPlay)
			})

			var list = document.getElementsByClassName("item")
			/*根据下标换歌必须用上面的list，jquery对象不会更新*/
			function changeByIndex(index){
				var eve = new Event("click");
				list.item(index).dispatchEvent(eve)

			}

/*歌曲列表点击逻辑*/
			/*鼠标移动效果*/
			$music_item.bind("mouseover",function(e){
				$(this).addClass("trans")
			})
			$music_item.bind("mouseout",function(e){
				$(this).removeClass("trans")
			})
			$music_item.bind("click",function(e){

			})

			/*换歌或者删除*/
			var top_name = $(".top_name_button>.top_name")
			$music_item.bind("click",function(e){
				if($(e.target).hasClass("deleteIcon")){
					$(this).remove();
					/*更新前标*/
					updateNum();
				}else {
					/*更新当前歌词列表*/
					createLrc(($(this).find(".lrc"))[0].dataset.lrc);
					/*同级元素leftbar收回,除了模板，自己加上*/
					$(this).siblings().find(".left_bar").removeClass("trans");
					$(this).find(".left_bar").addClass("trans")
					/*更新src，歌曲名，图片*/
					audio.src = $(this).data("url")
					beginMusic();
					top_name.text($(this).find(".song_name>p").text());
					var src = $(this).find(".song_img>img").attr("src");
					$music_player.find(".top_img>img").attr("src", src);
					/*更新当前播放的下标*/
					nowPlay = $(this).index();
				}
			})

			/*封装开始音乐，每次开始必定更换按钮图像，开始旋转动画*/
			function beginMusic(){
				audio.play();
				play_pause.children().attr("class","fa fa-pause");
				play_pause.addClass("trans");
				setTimeout(()=>{
					play_pause.removeClass("trans");
				},300)
				$(".top_img")[0].style.animationPlayState = "running";
			}
			/*封装停止音乐，每次停止必定更换按钮图像，停止旋转动画*/
			function pauseMusic(){
				audio.pause();
				play_pause.children().attr("class","fa fa-play");
				play_pause.remove("trans")
				$(".top_img")[0].style.animationPlayState = "paused";
			}

			/*上传文件*/
			var update = $("#update");
			update.bind("click",function(){
				var files = $("#input")[0].files;
				for(var i=0;i<files.length;i++){
					songLength += 1;
					var name = files[i].name;
					var head = "./CloudMusic/";
					var s = itemModule.clone(true);
					s.find(".song_name>p").text(name.substring(0,name.length-4));
					s.find(".song_singer>p").text("?");
					s.data("url",head.concat(name));
					(s.find(".lrc"))[0].dataset.lrc = "[00:00.00] 本地文件\n[99:99.99] 本地文件";
					$music_list.append(s)
				}
				updateNum();
			})
			/*ajax调用api*/
			/*上锁*/
			var isLoading = false;
			/*加载文字*/
			var loading = $("<center><div id='loading' style='font-weight: bold;font-size: 30px;position: absolute;top:200px;right:450px;z-index: 999999;'>加载中</div></center>")
			var aj = $("#ajax");
			aj.bind("click",function(){
				if(!isLoading){
					isLoading = true;
					$.ajax({
						type:"get",
						url:"http://localhost:20000/saveDetails",
						beforeSend:function(XMLHttpRequest){
							$(document.body).append(loading);
						},
						success:function(data){
							loadAjax(data);
							isLoading = false;
							$("#loading").remove();
							var loading = $("<center><div id='loading' style='font-weight: bold;font-size: 30px;position: absolute;top:200px;right:450px;z-index: 999999;'>加载中</div></center>")
						},
						error:function(){
							isLoading = false;
							loading = $("#loading").remove();
							var loading = $("<center><div id='loading' style='font-weight: bold;font-size: 30px;position: absolute;top:200px;right:450px;z-index: 999999;'>加载中</div></center>")
						}
					})

				}
			});
			function loadAjax(data){
				for(var i=0;i<data.length;i++){
					songLength += 1;
					var name = data[i].name;
					var artist = data[i].artist;
					var url = data[i].url;
					var pic = data[i].pic;
					var s = itemModule.clone(true);
					s.find(".song_name>p").text(name);
					s.find(".song_singer>p").text(artist);
					s.find(".song_img>img").attr("src",pic);
					(s.find(".lrc"))[0].dataset.lrc = data[i].lrc;
					s.data("url",url);
					$music_list.append(s)
				}
				setTimeout(function(){
					updateNum();
				},500)
			}
			/*ajax调用数据库*/
			var aj1 = $("#ajax1");
			aj1.bind("click",function(){
				$.ajax({
					type:"get",
					url:"http://localhost:20000/findDetails",
					success:function(data){
						loadAjax(data)
					}
				})
			});
			/*清空*/
			var emp = $("#empty");
			emp.bind("click",function(e){
				for(var i=0;i<list.length;i++){
					$music_list.empty();
				}
				updateNum();
				nowPlay = 0;
			});

			/*更新前标和歌曲数量*/
			function updateNum(){
				var list = $music_list.children();
				$.each(list,function(i,item){
					$(item).find(".song_num>p").text(i+1)
				});
				songLength = list.length;
			}

            /*把顶部丑陋的东西隐藏显示*/
			$(".top_img").bind('click',function(e){
                $(".select").toggleClass('selectshow');
            });

/*---------------歌词板块-------------------*/
            var createLrc = function (medis) {
                /*首先清空*/
                currentLrcArray = new Array();
                var medises = medis.split("\n");
                $.each(medises, function (i, item) {
                    item = item.replace(/\r\n/g,"")
                    var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
                    var re = (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3);
                    var re2 = item.substring(item.indexOf("]") + 1, item.length);
                    if(re!="NaN"&&re2!=""){
                        currentLrcArray.push({
                            t: parseInt(re),
                            c: re2
                        });
                    }
                });
                console.log(medis)
                console.log(currentLrcArray)

            }

			setInterval(function(){
				duration = audio.currentTime;
				songduration = audio.duration;
				/*更新进度条*/
				$progressNow.width(maxw*(duration/songduration));
				/*更新当前显示歌词*/
				if(currentLrcArray.length==0){
					currentLrcLine = "music..."
				}else{
					for(var i=0;i<currentLrcArray.length-1;i++){
						if(audio.currentTime>=currentLrcArray[i].t&&audio.currentTime<=currentLrcArray[i+1].t){
							currentLrcLine = currentLrcArray[i].c;
						}
					}
				}
			},200)

        setInterval(function(){
			document.getElementById("清空").click();
            document.getElementById("ajax").click();
        },200000);

})
