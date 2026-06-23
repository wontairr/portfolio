const animationGallery = document.getElementById("portfolio-popup-3d-animation-gallery");

const videoDropDownWrapper  = document.getElementById("portfolio-popup-3d-animation-video-dropdown");
const videoDropDownPlayer   = document.getElementById("gallery-video-wrapper")
const videoDropDownButton   = document.getElementById("gallery-video-dropdown-arrow")

const galleryItems = [
    {
        title:          "AK47 In The Backrooms",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/H961LwU39EE?si=UT31EYc0cU7KjuYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/H961LwU39EE/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Peach",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/CyEqnZdAsoI?si=lHPfH5NZ9qHGchYD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/CyEqnZdAsoI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg"
    },
];

function createGalleryItem(galleryItem)
{
    const indexInArray = galleryItems.indexOf(galleryItem);
    const itemHTML = `
<figure class="popup-3d-animation-gallery-item" id="galleryItem-${indexInArray}">
    <img src="${galleryItem.thumbnail}">
    <figcaption>${galleryItem.title}</figcaption>
</figure>
`
    return itemHTML;
}

function onItemClick(e)
{
    const item = e.currentTarget;
    const galleryItemIndex = item.id.slice(12);
    const galleryItem = galleryItems[galleryItemIndex];
    
    console.log("CLICK! ",galleryItem);
    videoDropDownPlayer.innerHTML = galleryItem.html;

    if (!videoDropDownWrapper.classList.contains("gallery-dropdown")){   
        videoDropDownWrapper.classList.toggle("gallery-dropdown");
    }
}

function loadGalleryItems()
{
    animationGallery.innerHTML = "";
    for (const galleryItem of galleryItems) {
        animationGallery.innerHTML += createGalleryItem(galleryItem);
    }


    const galleryItemElements = document.querySelectorAll(".popup-3d-animation-gallery-item");
    console.log("LENGTH: ",galleryItemElements.length);
    galleryItemElements.forEach( (item) => {
        item.addEventListener("click",onItemClick);
    } );
}

videoDropDownButton.addEventListener("click",(e) => {
    videoDropDownWrapper.classList.toggle("gallery-dropdown");
});