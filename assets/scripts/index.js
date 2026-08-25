const aboutSection = document.getElementById("about-section");
const lightModeBtn = document.getElementById("light-mode-btn");
const lightModeBtnShade = document.getElementById("light-mode-btn-selected-shade");
const root = document.documentElement;



let lightMode = "light";

function toggleLightingMode(mode)
{
    lightModeBtnShade.classList.toggle("light-mode-btn-dark-select");
    
    if (mode === "dark") {
        lightModeBtn.title = "Click to Switch to Light Mode";
        lightModeBtn.setAttribute("aria-label", "Click to Switch to Light Mode");
        root.classList.add("dark");
    } else if (mode === "light") {
        lightModeBtn.title = "Click to Switch to Dark Mode";
        lightModeBtn.setAttribute("aria-label", "Click to Switch to Dark Mode")
        if (root.classList.contains("dark")) {
            root.classList.remove("dark");
        }
    }

    lightModeBtn.setAttribute("aria-checked",mode === "dark" ? "true" : "false");
    lightMode = mode;

    localStorage.setItem("lightMode",mode);
}

// If the user prefers dark color schemes, set us to dark mode just once to save it.
if (localStorage.getItem("setLightModeAccordingToPreference") !== "true") {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    if (preference.matches) {
        toggleLightingMode("dark");
    }
    localStorage.setItem("setLightModeAccordingToPreference","true");
} else if (localStorage.getItem("lightMode") === "dark") {
    toggleLightingMode("dark");
}


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

lightModeBtn.addEventListener("click",(e)=>{
    toggleLightingMode(lightMode == "dark" ? "light" : "dark");
});

// Turn on color transitioning after we load.
setTimeout(()=>{
    document.body.classList.add("transition-colors");
    document.getElementById("left-navbar").classList.add("transition-colors");
    document.querySelectorAll(".main-section h1").forEach((h1) => {
        h1.classList.add("transition-colors");
    });
},1000)