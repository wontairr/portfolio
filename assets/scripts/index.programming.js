
const toolLogoHTMLs = {
    "html": `<img atts alt="HTML5 Logo" src="assets/images/portfolio/programming/tools/HTML5_Logo_64.png">`,
    "css": `<img atts alt="CSS3 Logo" src="assets/images/portfolio/programming/tools/CSS3_logo_and_wordmark.svg">`,
    "js": `<img atts alt="JavaScript Logo" src="assets/images/portfolio/programming/tools/JavaScript-logo.png">`,
    "lua": `<img atts alt="Lua Programming Language Logo" src="assets/images/portfolio/programming/tools/Lua-Logo_64x64.png">`
};

const usedToolSections = document.querySelectorAll(".programming-item-caption-used-tools");

const extraImgAttributes = `loading="lazy"`;

for (const section of usedToolSections) {
    const toolsUsed = section.id.split(",");
    
    let HTMLInsert = ``;

    // Get the HTML for each tool.
    for (const tool of toolsUsed) {
        let toolHTML = toolLogoHTMLs[tool];
        
        // Add in some extra attributes.
        toolHTML = toolHTML.replaceAll("atts",extraImgAttributes);

        HTMLInsert += toolHTML;
    }

    section.innerHTML = HTMLInsert;
}