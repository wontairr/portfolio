const otherWorkImageButtons = document.querySelectorAll(".otherwork-item-img-btn");

const viewer = document.querySelector("#otherwork-item-viewer");
const viewerImageContainer = document.querySelector("#otherwork-item-viewer-image-container");

const viewerButtonLeft = document.querySelector("#otherwork-item-viewer-btn-left");
const viewerButtonRight = document.querySelector("#otherwork-item-viewer-btn-right");

let viewerIndex = 0;

let revealedViewer = false;

let otherWorkViewerOpen = false


function otherWorkViewerToggle()
{
	viewer.classList.toggle("otherwork-viewer-hidden");
	viewer.classList.toggle("otherwork-viewer-shown");
	if (!revealedViewer) {
		revealedViewer = true;
		viewer.removeAttribute("hidden");
	}
	otherWorkViewerOpen = viewer.classList.contains("otherwork-viewer-shown");
}


function getImageHTML(source,hidden)
{
	const html = `
	<img class="otherwork-item-viewer-img ${hidden ? "hidden" : ""}" src="${source}"/>`;
	return html;
}


function setButtonVisibility(visible)
{
	if (visible) {
		viewerButtonLeft.removeAttribute("hidden");
		viewerButtonRight.removeAttribute("hidden");
		viewerButtonLeft.classList.remove("otherwork-item-img-btn-hidden");
		viewerButtonRight.classList.remove("otherwork-item-img-btn-hidden");
	}
	else {
		viewerButtonLeft.setAttribute("hidden","");
		viewerButtonRight.setAttribute("hidden","");
		viewerButtonLeft.classList.add("otherwork-item-img-btn-hidden");
		viewerButtonRight.classList.add("otherwork-item-img-btn-hidden");
	}
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
	setButtonVisibility(sources.length > 1);
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
	const isPhone = window.matchMedia("all and (max-width: 1500px)").matches;
	// Only hide viewer if we click the X.
	if (isPhone)
		return;
	if (e.target != viewerButtonLeft && e.target != viewerButtonRight) {
		otherWorkViewerToggle();
	}
});

viewer.addEventListener("animationend",(e)=> {
	// Whenever the close animation finishes, hide all the viewer stuff so it doesn't -
	// - show up for a split second upon opening the popup.
	if (!otherWorkViewerOpen) {
		// Put the images inside a hidden div to avoid reloading the images just incase.
		viewerImageContainer.innerHTML = `
<div hidden class="hidden" style="transform:translateX(-999999px);">${viewerImageContainer.innerHTML}</div>
		`;
		// Hide buttons.
		setButtonVisibility(false);
	}
});

// Flip through the images with arrow keys.
let canFlipWithArrowKeys = true;
document.body.addEventListener("keydown",(e)=>{
	if (!otherWorkViewerOpen || !canFlipWithArrowKeys) { return; }
	if (e.key === "ArrowRight") {
		viewerFlip(1);
		canFlipWithArrowKeys = false;
	}
	else if (e.key === "ArrowLeft") {
		viewerFlip(-1);
		canFlipWithArrowKeys = false;
	}
});
document.body.addEventListener("keyup",(e)=> {
	if (!otherWorkViewerOpen) { return; }
	if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
		canFlipWithArrowKeys = true;
	}
});

// Flip through the images with the arrow buttons.
viewerButtonRight.addEventListener("click",()=>viewerFlip(1));
viewerButtonLeft.addEventListener("click",()=>viewerFlip(-1));

// Make every img toggle the viewer when clicked.
otherWorkImageButtons.forEach((imgBtn)=> {
	const img = imgBtn.querySelector(".otherwork-item-img");

	imgBtn.title = "Click To View";
	imgBtn.setAttribute("aria-haspopup","menu");
	imgBtn.setAttribute("aria-controls","otherwork-item-viewer");
	imgBtn.addEventListener("click",()=>{
	viewerLoadImages(img.dataset.sources);
		otherWorkViewerToggle();
	});
});
