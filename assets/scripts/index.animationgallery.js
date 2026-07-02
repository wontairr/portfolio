const animationGallery = document.getElementById("portfolio-popup-3d-animation-gallery");

const videoDropDownWrapper = document.getElementById("portfolio-popup-3d-animation-video-dropdown");
const videoDropDownButton = document.getElementById("animation-video-dropdown-arrow");
const videoPlayer = document.getElementById("animation-video-wrapper");

const videoInfoTextWrapper = document.getElementById("animation-video-dropdown-video-info-txt-wrapper");

const galleryItems = [
    {
        title:          "AK47 In The Backrooms",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/H961LwU39EE?si=UT31EYc0cU7KjuYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/H961LwU39EE/mqdefault.jpg",
        date:           "May 15th, 2022",
        description:    `
Rig: hyper

Assets: Valve, https://skfb.ly/o9RNR (entity model), textures.com, Youtube

Sounds: Infinity Ward, Various Source Engine Games, Kane Pixels Backrooms Video

Music: Cowbell Cult - Smoke
`
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg",
        date:           "March 18th, 2023",
        description:    `
Rig: h33eLmeted on GameBanana

Assets: Valve, The_AntiPirate on GameBanana

Sounds: Infinity Ward, Valve, New World Interactive

Music: Shogun - Ulysees
`       
    },
    {
        title:          "Peach",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/CyEqnZdAsoI?si=lHPfH5NZ9qHGchYD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/CyEqnZdAsoI/mqdefault.jpg",
        date:           "April 26th, 2023",
        description:    `
Rig: hyper

Assets: Valve, masanaga on Sketchfab

Sounds: Various Sources

Music: Jack Black - Peaches

An animation based of the Peach meme.
`
    },
];


// Generate HTML snippet for a gallery item.
function createGalleryItemHTML(galleryItem)
{
    const indexInArray = galleryItems.indexOf(galleryItem);
    const itemHTML = `
<figure class="popup-3d-animation-gallery-item" id="galleryItem-${indexInArray}">
    <img src="${galleryItem.thumbnail}">
    <figcaption>${galleryItem.title}</figcaption>
</figure>
`;
    return itemHTML;
}


// Insert HTML into the video info box.
function setVideoInfo(galleryItem)
{


    let infoHTML = `
<p class="animation-video-dropdown-video-info-txt">
${galleryItem.date}
</p>
`;


    const descriptionLines = galleryItem.description.split("\n");
    for (const line of descriptionLines) {
        if (line.trim() == "") { continue; }

        
        infoHTML += `
<br>
<p class="animation-video-dropdown-video-info-txt">${line}</p>
`;


    }
    videoInfoTextWrapper.innerHTML = infoHTML;

    // Set text wrapper's dimensions to it's parents. (keep text in box)
    videoInfoTextWrapper.style.width = `${videoInfoTextWrapper.parentElement.clientWidth}px`;
    videoInfoTextWrapper.style.height = `${videoInfoTextWrapper.parentElement.clientHeight}px`;
}
window.addEventListener("resize",(e)=>{
    videoInfoTextWrapper.style.width = `${videoInfoTextWrapper.parentElement.clientWidth}px`;
    videoInfoTextWrapper.style.height = `${videoInfoTextWrapper.parentElement.clientHeight}px`;
})

function onGalleryItemClick(e)
{
    const item = e.currentTarget;
    // Cut out the array index from the id string.
    const galleryItemIndex = parseInt(item.id.slice(12));
    const galleryItem = galleryItems[galleryItemIndex];
    
    // Set the video player's HTML to something like youtube or whatever.
    videoPlayer.innerHTML = galleryItem.html;

    // Drop down the video player if it isn't already dropped down.
    if (!videoDropDownWrapper.classList.contains("gallery-dropdown")) {   
        videoDropDownWrapper.classList.toggle("gallery-dropdown");
    }

    setVideoInfo(galleryItem);
}


function loadGalleryItems()
{
    animationGallery.innerHTML = "";
    for (const galleryItem of galleryItems) {
        animationGallery.innerHTML += createGalleryItemHTML(galleryItem);
    }

    const galleryItemElements = document.querySelectorAll(".popup-3d-animation-gallery-item");
    // Setup click listeners for all the gallery item elements we just made.
    galleryItemElements.forEach( (item) => {
        item.addEventListener("click",onGalleryItemClick);
    } );
}

videoDropDownButton.addEventListener("click",(e) => {
    videoDropDownWrapper.classList.toggle("gallery-dropdown");
});


// VIDEO DROPDOWN TABS.

const [tabElementAbout, tabElementVideoPlayer, tabElementVideoInfo] = document.querySelectorAll(".animation-video-dropdown-tab");
const tabButtons = document.querySelectorAll("#animation-video-dropdown-tab-buttons button");

const TAB_ANIMATION_ABOUT = 0;
const TAB_VIDEO_PLAYER = 1;
const TAB_VIDEO_INFO = 2;


function videoDropDownSelectTab(tab)
{
    // Hide everything.
    const wasVideoPlayerVisible = !tabElementVideoPlayer.classList.contains("hidden");

    tabElementAbout.classList.add("hidden");
    tabElementVideoPlayer.classList.add("hidden");
    tabElementVideoInfo.classList.add("hidden");

    // Then choose what to show.
    switch(tab){
        case TAB_ANIMATION_ABOUT:

            tabElementAbout.classList.remove("hidden")
            break;

        case TAB_VIDEO_PLAYER:

            tabElementVideoPlayer.classList.remove("hidden");
            break;

        case TAB_VIDEO_INFO:
            
            tabElementVideoPlayer.classList.remove("hidden");
            tabElementVideoInfo.classList.remove("hidden")
            break;
    }

    // Add/remove classes on the buttons for styling.
    for (let i = 0; i < tabButtons.length; i++) {
        const button = tabButtons[i];

        // Is this the button we selected? if so, add the style class.
        if (i == tab) {
            button.classList.add("selected-tab");
            if (tab == TAB_VIDEO_INFO) {
                tabButtons[TAB_VIDEO_PLAYER].classList.add("selected-tab");                
            }
            continue;
        }
        button.classList.remove("selected-tab");
    }
}