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
