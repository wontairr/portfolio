const aboutSection = document.getElementById("about-section");
const lightModeBtn = document.getElementById("light-mode-btn");
const lightModeBtnShade = document.getElementById("light-mode-btn-selected-shade");

const colorVariableNames = [
    "--color-text-light",
    "--color-text-dark",
    
    "--color-dark",
    "--color-darkgray",
    "--color-darklight",
    
    "--color-bg",
    "--color-bg-shade",
    "--color-bg-darkshade",

    "--color-lightmode-btn-select",
    
    "--color-fg-light",
    "--color-fg",
    "--color-fg-dark",
    "--color-fg-verydark",
    
    "--color-fg-tab-select",
    
    "--color-fg-graylight",
    "--color-fg-graydark",

    "--color-red",
    "--color-red-dark",

    "--color-border-dark",

    "--color-scroll-bg",
    "--color-scroll-thumb",

    "--color-comfort-margin-opacity"
];

let lightMode = "light";

function toggleLightingMode(mode)
{  
    const root = document.querySelector(":root");
    const rootStyle = getComputedStyle(root);

    lightModeBtnShade.classList.toggle("light-mode-btn-dark-select");

    if (mode === "dark") {

        for (const varName of colorVariableNames) {
            const darkVarName = varName.replace("--color","--darkmode-color");
            const darkVarValue = rootStyle.getPropertyValue(darkVarName);
            root.style.setProperty(varName,darkVarValue);
        }
        lightModeBtn.title = "Click to Switch to Light Mode";

    } else if (mode === "light") {

        for (const varName of colorVariableNames) {
            const lightVarName = varName.replace("--color","--lightmode-color");
            const lightVarValue = rootStyle.getPropertyValue(lightVarName);
            root.style.setProperty(varName,lightVarValue);
        }

        lightModeBtn.title = "Click to Switch to Dark Mode";
    }

    lightModeBtn.setAttribute("aria-checked",mode === "dark" ? "true" : "false");
    lightMode = mode;
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