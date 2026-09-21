const portfolioChoices  = document.querySelectorAll(".portfolio-choice");
const portfolioPopups   = document.querySelectorAll(".portfolio-popup");
const portfolioPopupCloseButtons = document.querySelectorAll(".portfolio-popup-close-btn");

let currentPopup = null;

// Keys are IDs like "3d-animation" and the values are references to the popup elements.
const portfolioPopupList = {};

portfolioPopups.forEach( (popup) => {
    const popupId = popup.id;
    // Remove 'portfolio-popup-' from the id.
    const portfolioChoiceName = popupId.slice(16);
    // Store it for later when we need to open a popup.
    portfolioPopupList[portfolioChoiceName] = popup;

    popup.isPortfolioPopup = true;
    popup.portfolioPopupName = portfolioChoiceName;
    popup.contentElement = popup.querySelector(".portfolio-popup-contents");

    popup.addEventListener("click",popupCloseBtnCheck);
});

portfolioPopupCloseButtons.forEach( (btn) => {
    btn.addEventListener("click",popupCloseBtnCheck);
});

portfolioChoices.forEach( (btn) => {
    btn.addEventListener("click",buttonOpenPopup);
});

document.body.addEventListener("keydown",(e)=>{
    if (e.key === "Escape") {
        popupClose();
    }
})

function popupCloseBtnCheck(e)
{
    const btn = e.currentTarget;

    // (FOR MOBILE USERS ONLY) If the Other Work image viewer is open, then instead of closing the current popup -
    // - we should close the image viewer.
    if (otherWorkViewerOpen) {
        otherWorkViewerToggle();
        return;
    }

    // This prevents the children of the popup element from propagating the close event.
    if (e.target != btn) { e.stopPropagation(); return; }
    
    popupClose();
    
    // Prevent this click event from going up to the popup element (If we are a close button).
    if (!btn.isPortfolioPopup) {
        e.stopPropagation();
    }
}

function popupClose()
{
    if (!currentPopup) {
        console.error("TRIED TO CLOSE POPUP BUT currentPopup IS NULL!");
        return;
    }

    if (currentPopup.isPortfolioPopup && currentPopup.portfolioPopupName === "3d-animation") {
        onClose3DAnimationPopup();
    }

    // Toggle off the shown class.
    currentPopup.classList.toggle("shown");
    // Toggle on the hidden class.
    currentPopup.classList.toggle("hidden");
    currentPopup.setAttribute("hidden","");

    // Re-enable body scrolling.
    document.body.classList.toggle("dont-scroll");

    currentPopup = null;
}


function popupOpen(portfolioChoiceName)
{
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
    popup.removeAttribute("hidden");
    // Toggle on the shown class.
    popup.classList.toggle("shown");
    // Scroll the content box to the top.
    popup.contentElement.scrollTop = 0;

    currentPopup = popup;

}

function buttonOpenPopup(e)
{
    // Turn off body scrolling.
    document.body.classList.toggle("dont-scroll");

    const rootChoiceBtn = e.currentTarget;
    
    const choiceId = rootChoiceBtn.id;
    // Remove 'portfolio-choice-' from the id.
    const portfolioChoiceName = choiceId.slice(17);

    popupOpen(portfolioChoiceName);
}