const otherWorkImages = document.querySelectorAll(".otherwork-item-img");
otherWorkImages.forEach((img)=> {
	img.addEventListener("click",(e)=>{
		img.classList.toggle("otherwork-item-img-popup");
	});
});