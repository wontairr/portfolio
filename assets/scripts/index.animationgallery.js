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
        date:           new Date("May 15 2022"),
        tags:           ["rifle"],
        description:    `
Rig: hyper

Assets: Valve, <a href="https://skfb.ly/o9RNR">https://skfb.ly/o9RNR</a> (entity model), textures.com, Youtube

Sounds: Infinity Ward, Various Source Engine Games, Kane Pixels Backrooms Video

Music: Cowbell Cult - Smoke
`
    },
    {
        title:          "Dual Tec9's",
        html:           `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMc1QN44SI?si=JTGXpaNE2xDaHMpj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        thumbnail:      "https://img.youtube.com/vi/ZMMc1QN44SI/mqdefault.jpg",
        date:           new Date("March 18 2023"),
        tags:           ["smg","dual"],
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
        date:           new Date("April 26 2023"),
        tags:           ["throw"],
        description:    `
Rig: hyper

Assets: Valve, masanaga on Sketchfab

Sounds: Various Sources

Music: Jack Black - Peaches

An animation based of the Peach meme.
`
    },
];

// Sort by date.
galleryItems.sort( (a,b) => {
    if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    }
    return 0;
});


const dateStringOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Keys are the lowercase titles of the items, values are the elements.
// Has "tags" object where the keys are tags and the values are arrays with the related elements.
let loadedGalleryItemElements = {};

// True if we clicked the dropdown for the video player.
let isDroppedDown = false;

let hasClickedAtleastOneVideo = false;

/////
///
/// VIDEO GALLERY
///
/////

function toggleVideoDropDown()
{
    isDroppedDown = !isDroppedDown;
    videoDropDownWrapper.classList.toggle("gallery-dropdown");
    videoDropDownWrapper.setAttribute("aria-expanded",isDroppedDown ? "true" : "false");
    videoDropDownButton.setAttribute("aria-label",isDroppedDown ? "Open Video Player Dropdown" : "Close Video Player Dropdown");
}

// Generate HTML snippet for a gallery item.
// FIXME: Wrap figure element in a button.
function getGalleryItemHTML(galleryItem)
{
    const indexInArray = galleryItems.indexOf(galleryItem);
    const itemHTML = `
<figure role="button" tabindex="0" class="popup-3d-animation-gallery-item" id="galleryItem-${indexInArray}">
    <img class="gallery-item-thumb" src="${galleryItem.thumbnail}" alt="Thumbnail for '${galleryItem.title}'">
    <figcaption class="gallery-item-caption"><span>${galleryItem.title}</span></figcaption>
</figure>
`;
    return itemHTML;
}

// Insert HTML into the video info box.
const videoDescriptionRegex = /(rig|assets|sounds|music)/ig;
function setVideoInfo(galleryItem)
{

    let infoHTML = `
        <h3 class="animation-video-dropdown-vid-info-txt vid-info-txt-title">
        ${galleryItem.title}
        </h3>
        <p class="animation-video-dropdown-vid-info-txt vid-info-txt-date">
        ${galleryItem.date.toLocaleDateString(undefined,dateStringOptions)}
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

    videoInfoTextContainer.scrollTop = 0;
}


function getGalleryItemFromItemElement(galleryItemElement)
{
    // Cut out the array index from the id string.
    const galleryItemIndex = parseInt(galleryItemElement.id.slice(12));
    const galleryItem = galleryItems[galleryItemIndex];
    return galleryItem;
}


function onGalleryItemClick(e)
{
    hasClickedAtleastOneVideo = true;

    const item = e.currentTarget;
    const galleryItem = getGalleryItemFromItemElement(item);
    
    // Set the video player's HTML to something like youtube or whatever.
    videoPlayer.innerHTML = galleryItem.html;
    const innerIframe = videoPlayer.querySelector("iframe");
    if (innerIframe) {
        innerIframe.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
    }

    // Drop down the video player if it isn't already dropped down.
    if (!isDroppedDown) {   
        toggleVideoDropDown();
    }
    videoDropDownSelectTab(TAB_VIDEO_PLAYER,true);

    setVideoInfo(galleryItem);
}


function loadGalleryItems()
{
    animationGallery.innerHTML = "";
    for (const galleryItem of galleryItems) {
        animationGallery.innerHTML += getGalleryItemHTML(galleryItem);
    }

    const galleryItemElements = [...document.querySelectorAll(".popup-3d-animation-gallery-item")];

    // Clear the previous cache.
    loadedGalleryItemElements = {};
    // Setup tag map.
    loadedGalleryItemElements.tags = new Map();

    const tags = loadedGalleryItemElements.tags;

    // Setup click listeners for all the gallery item elements we just made.
    for (const itemElement of galleryItemElements) {
        itemElement.addEventListener("click",onGalleryItemClick);

        // Cache the element reference for later use. (in search mainly)
        const galleryItem = getGalleryItemFromItemElement(itemElement);
        const galleryItemTitle = galleryItem.title.toLowerCase();
        loadedGalleryItemElements[galleryItemTitle] = itemElement;

        for (const tag of galleryItem.tags) {
            // Create tag array.
            if (!tags.has(tag)) {
                tags.set(tag,[itemElement]);
                continue;
            }
            tags.get(tag).push(itemElement);
        }
    }
}

function onClose3DAnimationPopup()
{
    if (hasClickedAtleastOneVideo) {
        videoPlayer.innerHTML = `
<h2 id="animation-video-player-placeholder-txt">Choose an Animation From the Gallery Below!</h2>
`;
        videoInfoTextContainer.innerHTML = `
<p class="animation-video-dropdown-vid-info-txt">
    Video info will appear here when a video is selected from the gallery below.
</p>
        `;
    }

    // Close dropdown.
    if (isDroppedDown) {
        toggleVideoDropDown();
    }
    videoDropDownSelectTab(TAB_VIDEO_PLAYER);
}

videoDropDownButton.addEventListener("click",(e) => {
    toggleVideoDropDown();
});



/////
///
/// VIDEO DROPDOWN TABS
///
/////



function videoDropDownSelectTab(tab,isReFocusingVideoPlayer = false)
{
    const isPhone = window.matchMedia("all and (max-width: 1500px)").matches;

    const wasVideoInfoVisible = !tabElementVideoInfo.classList.contains("hidden");
    
    // Hide everything...
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
            if (isReFocusingVideoPlayer && wasVideoInfoVisible && !isPhone) {
                tabElementVideoInfo.classList.remove("hidden")
            }
            break;

        case TAB_VIDEO_INFO:
            // Show both video info and player.
            if (!isPhone) {
                tabElementVideoPlayer.classList.remove("hidden");
            }
            tabElementVideoInfo.classList.remove("hidden")

            videoInfoTextContainer.scrollTop = 0;
            break;
    }

    // Add/remove classes on the buttons for styling.
    for (let i = 0; i < tabButtons.length; i++) {
        const button = tabButtons[i];

        // Is this the button we selected? if so, add the style class.
        if (i === tab) {
            button.classList.add("selected-tab");
            button.setAttribute("aria-selected","true");
            if (tab === TAB_VIDEO_INFO && !isPhone) {
                // Since we open the video player too, makes sense to keep it's button selected.
                tabButtons[TAB_VIDEO_PLAYER].classList.add("selected-tab");                
            }
            continue;
        }

        // If we are refocusing to the video player tab, and video info was visible, -
        // - don't "unselect" the video info tab.
        if (!isPhone && i === TAB_VIDEO_INFO && isReFocusingVideoPlayer && wasVideoInfoVisible) {
            continue;
        }
        button.classList.remove("selected-tab");
        button.setAttribute("aria-selected","false");
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
        if (itemTitle === "tags") {
            continue;
        }

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
    
    if (isQueryEmpty) {
        return;
    }
    // Reveal elements based on their tags.
    const tags = loadedGalleryItemElements.tags;
    if (!tags.has(query)) {
        return;
    }
    for (const itemEl of tags.get(query)) {
        itemEl.classList.remove("hidden");
    }
}
videoSearchBar.addEventListener("input",(e) => searchGallery(videoSearchBar.value));