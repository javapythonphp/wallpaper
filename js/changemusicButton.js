// JavaScript Document
/*songListObject在musicPlayer*/


function upDate(){
	var name = document.getElementsByClassName("nam")[0];	
	name.innerHTML = ""
	var file = document.getElementById("file").files;
	for(var i=0;i<file.length;i++){						    
		var newDiv = document.createElement("div");
		var newDivContainer = document.createElement("div");
		var x = file[i].name;
		var text = document.createTextNode(x);
		
		/*为新增的div添加歌曲名 css修饰 javascript点击换歌事件*/		
		newDivContainer.setAttribute("class","songFontContainer");
		newDiv.setAttribute("class","name");
		newDiv.setAttribute("onclick","change(this)");
		newDiv.appendChild(text);
		newDivContainer.appendChild(newDiv)
		/*-------*/
		name.appendChild(newDivContainer); 
	}	
	
	songListObject = document.getElementsByClassName("nam")[0];
	childNodes = songListObject.children;
	songListName = new Array();
	for(var i=0;i<childNodes.length;i++){
		songListName.push("CloudMusic/"+childNodes[i].children[0].innerHTML)
	}
}

function upDate2(){
	var name = document.getElementsByClassName("nam")[0];	
	var file = document.getElementById("file").files;
	for(var i=0;i<file.length;i++){		
		var newDiv = document.createElement("div");
		var newDivContainer = document.createElement("div");
		var x = file[i].name;
		var text = document.createTextNode(x);
		/*为新增的div添加歌曲名 css修饰 javascript点击换歌事件*/		
		newDivContainer.setAttribute("class","songFontContainer");
		newDiv.setAttribute("class","name");
		newDiv.setAttribute("onclick","change(this)");
		newDiv.appendChild(text);
		newDivContainer.appendChild(newDiv)
		/*-------*/
		name.appendChild(newDivContainer); 
	}
	
	songListObject = document.getElementsByClassName("nam")[0];
	childNodes = songListObject.children;
	songListName = new Array();
	for(var i=0;i<childNodes.length;i++){
		songListName.push("CloudMusic/"+childNodes[i].children[0].innerHTML)
	}
}

function upDate3(){
	var name = document.getElementsByClassName("nam")[0];	
	var file = document.getElementById("file").files;
	var before = name.firstElementChild;
	for(var i=0;i<file.length;i++){		
		var newDiv = document.createElement("div");
		var newDivContainer = document.createElement("div");
		var x = file[i].name;
		var text = document.createTextNode(x);
		/*为新增的div添加歌曲名 css修饰 javascript点击换歌事件*/		
		newDivContainer.setAttribute("class","songFontContainer");
		newDiv.setAttribute("class","name");
		newDiv.setAttribute("onclick","change(this)");
		newDiv.appendChild(text);
		newDivContainer.appendChild(newDiv);
		/*-------*/
		name.insertBefore(newDivContainer,before);
		before = newDivContainer;
	}	
	
	songListObject = document.getElementsByClassName("nam")[0];
	childNodes = songListObject.children;
	songListName = new Array();
	for(var i=0;i<childNodes.length;i++){
		songListName.push("CloudMusic/"+childNodes[i].children[0].innerHTML)
	}
}