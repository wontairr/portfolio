const aboutSection = document.getElementById("about-section");
const lightModeBtn = document.getElementById("light-mode-btn");

const colorVariableNames = [
    "--color-text-light",
    "--color-text-dark",
    
    "--color-dark",
    "--color-darkgray",
    "--color-darklight",
    
    "--color-bg",
    "--color-bg-shade",
    "--color-bg-darkshade",
    
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

    for (const varName of colorVariableNames) {
        if (mode === "dark") {
            const darkVarName = varName.replace("--color","--darkmode-color");
            const darkVarValue = rootStyle.getPropertyValue(darkVarName);
            console.log(darkVarName + " " + darkVarValue);
            console.log(varName + " " + rootStyle.getPropertyValue(varName));
            root.style.setProperty(varName,darkVarValue);
        } else if (mode === "light") {
            const lightVarName = varName.replace("--color","--lightmode-color");
            const lightVarValue = rootStyle.getPropertyValue(lightVarName);
            root.style.setProperty(varName,lightVarValue);
            console.log("light")
        }
    }
    lightMode = mode;
}
lightModeBtn.addEventListener("click",(e)=>{
    console.log("click");
    toggleLightingMode(lightMode == "dark" ? "light" : "dark");
});
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

