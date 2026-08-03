const otherWorkImages = document.querySelectorAll(".otherwork-item-img");

const viewer = document.querySelector("#otherwork-item-viewer");
const viewerImageContainer = document.querySelector("#otherwork-item-viewer-image-container");

const viewerButtonLeft = document.querySelector("#otherwork-item-viewer-button-left");
const viewerButtonRight = document.querySelector("#otherwork-item-viewer-button-right");

let viewerIndex = 0;

function viewerToggle()
{
	viewer.classList.toggle("otherwork-viewer-hidden");
}

function getImageHTML(source,hidden)
{
	const html = `
	<img class="otherwork-item-viewer-img ${hidden ? "hidden" : ""}" src="${source}"/>`;
	return html;
}

function viewerLoadImages(sourcesString)
{
	const sources = sourcesString.split(",");
	viewerImageContainer.innerHTML = "";
	for (let i = 0; i < sources.length; i++) {
		const source = sources[i].trim();
		viewerImageContainer.innerHTML += getImageHTML(source,i > 0);
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
otherWorkImages.forEach((img)=> {
	img.addEventListener("click",(e)=>{
		viewerLoadImages(img.dataset.sources);
		viewerToggle();
	});
});
