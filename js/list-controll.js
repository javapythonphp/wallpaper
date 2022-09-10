// JavaScript Document
function appendAjax(){
	var allMusicInList = 0;
	var getMusicInList = 0;
	var name = document.querySelector(".nam");
	songListName = new Array();
	songListObject = document.getElementsByClassName("nam")[0];
	childNodes = songListObject.children;
	for(var i=0;i<childNodes.length;i++){
		songListName.push("CloudMusic/"+childNodes[i].children[0].innerHTML)
	}
	
	
		var data1Obj
		var data2Obj
		$.ajax({
			type:"post",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id=2882628380",
			success:function(data0){
				var list = data0.playlist.trackIds;
				
				var loadText = document.createElement("div");
				var textCenter = document.createTextNode("正在加载中，请稍等");
				loadText.appendChild(textCenter);

				document.body.appendChild(loadText);
				
				list.forEach(item=>{
					/*---------------------------------------------------*/
					$.ajax({
						async:false,
						type:"get",
						url:"https://music.jeeas.cn/v1/music/detail?id="+item.id+"&from=music",
						success:function(data1){
							data1Obj = JSON.parse(data1);
							/*---------------------------------------------------*/
							$.ajax({
								async:false,
								type:"get",
								url:"https://music.jeeas.cn/v1/music/url?id="+item.id+"&from=music",
								success:function(data2){
									data2Obj = JSON.parse(data2);
			
										getMusicInList += 1;
										var newDiv = document.createElement("div");
										var newDivContainer = document.createElement("div");
										var text = document.createTextNode(data1Obj.songs[0].name+"-"+data1Obj.songs[0].ar[0].name);
										newDivContainer.setAttribute("class","songFontContainer");
										newDiv.setAttribute("class","name");
										newDiv.setAttribute("data-url",data2Obj.data[0].url);
										newDiv.setAttribute("onclick","initchange(this)");
										newDiv.appendChild(text);
										newDivContainer.appendChild(newDiv)
										name.appendChild(newDivContainer); 

										songListName.push("append")

								}
							});
							/*---------------------------------------------------*/
						}
					});
					/*---------------------------------------------------*/	

				});
				
				document.body.removeChild(loadText)
				
			}
		});
	
}




function toggleChangeMusic(){
	var kuang = document.getElementsByClassName("kuang")[0];
	$(kuang).toggleClass("trans");
}

function clearList(){
	document.getElementsByClassName("nam")[0].innerHTML = "";
}
