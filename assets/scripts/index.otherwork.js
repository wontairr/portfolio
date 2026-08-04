const otherWorkImageButtons = document.querySelectorAll(".otherwork-item-img-btn");

const viewer = document.querySelector("#otherwork-item-viewer");
const viewerImageContainer = document.querySelector("#otherwork-item-viewer-image-container");

const viewerButtonLeft = document.querySelector("#otherwork-item-viewer-button-left");
const viewerButtonRight = document.querySelector("#otherwork-item-viewer-button-right");

let viewerIndex = 0;

let revealedViewer = false;

function viewerToggle()
{
	viewer.classList.toggle("otherwork-viewer-hidden");
	if (!revealedViewer && !viewer.classList.contains("otherwork-viewer-hidden")) {
		revealedViewer = true;
		viewer.removeAttribute("hidden");
	}
}

function getImageHTML(source,hidden)
{
	const html = `
	<img class="otherwork-item-viewer-img ${hidden ? "hidden" : ""}" src="${source}"/>`;
	return html;
}

function viewerLoadImages(sourcesString)
{
	viewerIndex = 0;
	const sources = sourcesString.split(",");
	viewerImageContainer.innerHTML = "";
	for (let i = 0; i < sources.length; i++) {
		const source = sources[i].trim();
		viewerImageContainer.innerHTML += getImageHTML(source,i > 0);
	}

	// Hide buttons if we just have one image.
	if (sources.length < 2) {
		viewerButtonLeft.setAttribute("hidden","");
		viewerButtonRight.setAttribute("hidden","");
		viewerButtonLeft.classList.add("otherwork-item-img-btn-hidden");
		viewerButtonRight.classList.add("otherwork-item-img-btn-hidden");
	} else {
		viewerButtonLeft.removeAttribute("hidden");
		viewerButtonRight.removeAttribute("hidden");
		viewerButtonLeft.classList.remove("otherwork-item-img-btn-hidden");
		viewerButtonRight.classList.remove("otherwork-item-img-btn-hidden");
	}
}

function viewerFlip(direction)
{
	const viewerImages = viewerImageContainer.querySelectorAll(".otherwork-item-viewer-img");
	viewerIndex += direction;
	if (viewerIndex > viewerImages.length - 1) {
		viewerIndex = 0;
	} else if (viewerIndex < 0) {
		viewerIndex = viewerImages.length - 1;
	}

	for (let i = 0; i < viewerImages.length; i++){
		// Reveal the image at the index;
		if ( i == viewerIndex ) {
			viewerImages[i].classList.remove("hidden");
			continue;
		}
		// Hide the rest.
		viewerImages[i].classList.add("hidden");
	}
}

// Hide viewer if we click it.
viewer.addEventListener("click",(e) => {
	if (e.target != viewerButtonLeft && e.target != viewerButtonRight) {
		viewerToggle();
	}
})

viewerButtonRight.addEventListener("click",(e)=>viewerFlip(1));
viewerButtonLeft.addEventListener("click",(e)=>viewerFlip(-1));

// Make every img toggle the viewer when clicked.
otherWorkImageButtons.forEach((imgBtn)=> {
	const img = imgBtn.querySelector(".otherwork-item-img");

	imgBtn.title = "Click To View";
	imgBtn.addEventListener("click",(e)=>{
		viewerLoadImages(img.dataset.sources);
		viewerToggle();
	});
});
