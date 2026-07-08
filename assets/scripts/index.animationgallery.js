const animationGallery = document.getElementById("portfolio-popup-3d-animation-gallery");

const videoDropDownWrapper = document.getElementById("portfolio-popup-3d-animation-video-dropdown");
const videoDropDownButton = document.getElementById("animation-video-dropdown-arrow");
const videoPlayer = document.getElementById("animation-video-wrapper");

const videoInfoTextContainer = document.getElementById("animation-video-dropdown-vid-info-txt-container");

const [tabElementAbout, tabElementVideoPlayer, tabElementVideoInfo] = document.querySelectorAll(".animation-video-dropdown-tab");
const tabButtons = document.querySelectorAll("#animation-video-dropdown-tab-buttons button");

const TAB_ANIMATION_ABOUT = 0;
const TAB_VIDEO_PLAYER = 1;
const TAB_VIDEO_INFO = 2;

const videoSearchBar = document.getElementById("animation-gallery-search-bar");

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

// Keys are the lowercase titles of the items, values are the elements.
const loadedGalleryItemElements = {};


/////
///
/// VIDEO GALLERY
///
/////



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


// Set text containers's dimensions to it's parents. (keep text in box)
function resizeVideoInfoTextContainer()
{
    videoInfoTextContainer.style.width = `${videoInfoTextContainer.parentElement.clientWidth}px`;
    videoInfoTextContainer.style.height = `${videoInfoTextContainer.parentElement.clientHeight}px`;
}
window.addEventListener("resize",resizeVideoInfoTextContainer);


// Insert HTML into the video info box.
const videoDescriptionRegex = /(rig|assets|sounds|music)/ig;
function setVideoInfo(galleryItem)
{
    let infoHTML = `
        <h3 class="animation-video-dropdown-vid-info-txt vid-info-txt-title">
        ${galleryItem.title}
        </h3>
        <p class="animation-video-dropdown-vid-info-txt vid-info-txt-date">
        ${galleryItem.date}
        </p>
    `;

    const descriptionLines = galleryItem.description.split("\n");
    // Add each line of the description to the info box.
    for (const line of descriptionLines) {
        if (line.trim() === "") { continue; }
        
        let modifiedLine = line;
        // Give certain terms different styling.
        modifiedLine = line.replaceAll(videoDescriptionRegex,"<span class=\"vid-info-txt-special\">$1</span>")

        infoHTML += `
            <br>
            <p class="animation-video-dropdown-vid-info-txt">${modifiedLine}</p>
        `;
    }

    videoInfoTextContainer.innerHTML = infoHTML;

    resizeVideoInfoTextContainer();
    videoInfoTextContainer.scrollTop = 0;
}


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
    videoDropDownSelectTab(TAB_VIDEO_PLAYER,true);

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
        // Save the element for later use. (in search mainly)
        const galleryItemTitle = item.querySelector("figcaption").textContent.toLowerCase();
        loadedGalleryItemElements[galleryItemTitle] = item;
    } );
}

videoDropDownButton.addEventListener("click",(e) => {
    videoDropDownWrapper.classList.toggle("gallery-dropdown");
});



/////
///
/// VIDEO DROPDOWN TABS
///
/////



function videoDropDownSelectTab(tab,isReFocusingVideoPlayer = false)
{
    // Hide everything.
    const wasVideoPlayerVisible = !tabElementVideoPlayer.classList.contains("hidden");
    const wasVideoInfoVisible = !tabElementVideoInfo.classList.contains("hidden");

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
            // If we want to refocus to the video player tab, -
            // - make sure we don't close the already opened video info.
            if (isReFocusingVideoPlayer && wasVideoInfoVisible) {
                tabElementVideoInfo.classList.remove("hidden")
            }
            break;

        case TAB_VIDEO_INFO:
            // Show both video info and player.
            tabElementVideoPlayer.classList.remove("hidden");
            tabElementVideoInfo.classList.remove("hidden")

            videoInfoTextContainer.scrollTop = 0;
            resizeVideoInfoTextContainer();
            break;
    }

    // Add/remove classes on the buttons for styling.
    for (let i = 0; i < tabButtons.length; i++) {
        const button = tabButtons[i];

        // Is this the button we selected? if so, add the style class.
        if (i === tab) {
            button.classList.add("selected-tab");
            if (tab === TAB_VIDEO_INFO) {
                // Since we open the video player too, makes sense to keep it's button selected.
                tabButtons[TAB_VIDEO_PLAYER].classList.add("selected-tab");                
            }
            continue;
        }

        // If we are refocusing to the video player tab, and video info was visible, -
        // - don't "unselect" the video info tab.
        if (i === TAB_VIDEO_INFO && isReFocusingVideoPlayer && wasVideoInfoVisible) {
            continue;
        }
        button.classList.remove("selected-tab");
    }
}



/////
///
/// VIDEO SEARCH BAR
///
/////


// Hides/reveals items based on search query.
function searchGallery(query)
{
    query = query.toLowerCase();
    const isQueryEmpty = query.trim() === "";

    for (const itemTitle in loadedGalleryItemElements) {
        const itemEl = loadedGalleryItemElements[itemTitle];
        // No query? Just reveal all the items again.
        if (isQueryEmpty) {
            itemEl.classList.remove("hidden");
            continue;
        }
        if (!itemTitle.includes(query)){
            itemEl.classList.add("hidden");
        } else {
            itemEl.classList.remove("hidden");
        }
    }
}
videoSearchBar.addEventListener("input",(e) => searchGallery(videoSearchBar.value));