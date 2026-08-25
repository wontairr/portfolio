// This script just sets the styling of the site before everything loads to prevent a white flash.
if (localStorage.getItem("setLightModeAccordingToPreference") !== "true") {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    if (preference.matches) {
        document.documentElement.classList.add("dark");
    }
} else if (localStorage.getItem("lightMode") === "dark") {
	document.documentElement.classList.add("dark");
}