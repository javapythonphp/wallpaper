// JavaScript Document
var flow_array = new Array();
$(document).ready(function(){
	flow_array = new Array("https://i0.hdslb.com/bfs/album/ee792f250e1312da6132c8c40b7719d98bd4932f.png",
							  "https://i0.hdslb.com/bfs/album/2fb9d7a0e55b6f82c0d15be83f89d98a788c663a.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/47dde75574c8f585e995410a5f66075465d02236.jpg",
							   "https://i0.hdslb.com/bfs/album/c18757c36e30b75b52d105e3311d56b753892afd.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/dc39230433d0ecc1518383e2a5b754976df730c1.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/a5faea398774f2631eb7dbe6bb1d28c6afb66067.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/6c7f3d8e234fcb0e4876b72f00a831727dd073a0.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/4e783bd0ddb8da6be4cc5cf46f4e8b179db88f10.jpg@2000w_1e.webp",
							   "https://i0.hdslb.com/bfs/album/4e783bd0ddb8da6be4cc5cf46f4e8b179db88f10.jpg@2000w_1e.webp");
	/*first是第一次开始显示的图片*/
	var flow_firstImage = $(".changeImage").eq(0);
	var flow_secondImage = $(".changeImage").eq(1);
	/*防止随机图片重复*/
	var flow_randomIndex = -1;
	var flow_prerandomIndex;
	function background_flow(){
		flow_prerandomIndex = flow_randomIndex;

		do{
			flow_randomIndex = Math.floor(flow_array.length*Math.random());
		}while(flow_randomIndex==flow_prerandomIndex)

		flow_firstImage.attr("src",flow_array[flow_randomIndex])
		/*防止图片未加载完成*/
		setTimeout(function(){
			flow_firstImage.addClass("showScale");
			flow_firstImage.addClass("showOpacity");
			flow_secondImage.removeClass("showOpacity");
		},500)
		setTimeout(function(){
			flow_secondImage.removeClass("showScale");
			var temp = flow_firstImage;
			flow_firstImage = flow_secondImage;
			flow_secondImage = temp;
		},5000)

	}
	background_flow()
	var flow_internal = setInterval(function(){
		background_flow();
	},10000);
	/*计时器是否在运行*/
	var flow_isRun= true;
	$("button[name='flowStop']").bind("click",function(){
		if(flow_isRun){
			$(this).text("开始")
			clearInterval(flow_internal);
			flow_isRun = false;
		}else{
			$(this).text("停止")
			flow_isRun = true;
			background_flow();
			flow_internal = setInterval(function(){
				background_flow();
			},10000);
		}

	})
})
