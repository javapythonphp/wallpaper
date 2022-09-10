// JavaScript Document
document.body.addEventListener("click",function(e){
	var wave = document.createElement("div");
	wave.classList.add("wave");
	wave.style.left = e.pageX + "px";
	wave.style.top = e.pageY + "px";
	this.appendChild(wave);
	setTimeout(()=>{
		this.removeChild(wave);
	},1000)
})