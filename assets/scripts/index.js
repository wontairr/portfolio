const body = document.querySelector("body");

const aboutSection = document.getElementById("about-section");
// FIXME: Doesn't always work at low res.
function resizeAboutSection()
{
    const newHeight = Math.max(aboutSection.clientHeight,window.innerHeight).toString() + "px";
    aboutSection.style.minHeight = newHeight;
}

if (document.readyState === "loading") {
    // Make the about section take up the whole screen height so that the portfolio isn't peeking in visually.
    document.addEventListener("DOMContentLoaded",resizeAboutSection);
} else {
    resizeAboutSection();
}


const portfolioChoices  = document.querySelectorAll(".portfolio-choice");
const portfolioPopups   = document.querySelectorAll(".portfolio-popup");
const portfolioPopupCloseButtons = document.querySelectorAll(".portfolio-popup-close-btn");

// Keys are IDs like "3d-animation" and the values are references to the popup elements.
const portfolioPopupList = {};

portfolioPopups.forEach( (popup) => {
    const popupId = popup.id;
    // Remove 'portfolio-popup-' from the id.
    const portfolioChoiceName = popupId.slice(16);
    // Store it for later when we need to open a popup.
    portfolioPopupList[portfolioChoiceName] = popup;

    popup.isPortfolioPopup = true;
    popup.contentElement = popup.querySelector(".portfolio-popup-contents");

    popup.addEventListener("click",popupClose);
});

portfolioPopupCloseButtons.forEach( (btn) => {
    btn.addEventListener("click",popupClose);
})

portfolioChoices.forEach( (btn) => {
    btn.addEventListener("click",popupOpen);
});


function popupClose(e)
{

    const btn = e.currentTarget; // Get the root element that is attached to the event.

    // This prevents the children of the popup element from propagating the close event.
    if (e.target != btn) { e.stopPropagation(); return; }
    
    // Re-enable body scrolling.
    body.classList.toggle("dont-scroll");


    // Get the popup (It can be the close button or the popup element that called this function).
    const popup = btn.isPortfolioPopup ? btn : btn?.parentElement;
    if (!popup) {
        console.error("POPUP FOR PORTFOLIO CHOICE ",btn," IS NULL!");
        return;
    }
    // Toggle off the shown class.
    popup.classList.toggle("shown");
    // Toggle on the hidden class.
    popup.classList.toggle("hidden");

    // Prevent this click event from going up to the popup element (If we are a close button).
    if (!btn.isPortfolioPopup) {
        e.stopPropagation();
    }
}

function popupOpen(e)
{
    
    // Turn off body scrolling.
    body.classList.toggle("dont-scroll");

    const rootChoiceBtn = e.currentTarget;
    
    const choiceId = rootChoiceBtn.id;
    // Remove 'portfolio-choice-' from the id.
    const portfolioChoiceName = choiceId.slice(17);
    if (portfolioChoiceName === "3d-animation"){
        loadGalleryItems();
    }
        

    const popup = portfolioPopupList[portfolioChoiceName];
    if (!popup) {
        console.error("POPUP FOR PORTFOLIO CHOICE NAME ",portfolioChoiceName," IS NULL!");
        return;
    }
    // Toggle off the hidden class.
    popup.classList.toggle("hidden");
    // Toggle on the shown class.
    popup.classList.toggle("shown");
    // Scroll the content box to the top.
    popup.contentElement.scrollTop = 0;

}