"use strict";
var _a, _b;
const settingsList = document.getElementById("settings-list");
const settingsContent = document.getElementById("settings-content");
(_a = document.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
function showSetting(settingName) {
    const template = document.querySelector(`template[setting-name="${settingName}"]`);
    try {
        appendTemplateElement(template, settingsContent, tmp => {
            // set data for each path in the setting content
            settingsContent.innerHTML = "";
            tmp.querySelectorAll("path[icon-data]").forEach(assignIconData);
            settingsContent.setAttribute('content', template.getAttribute("href"));
        });
    }
    catch (_a) {
        console.error(`Could not find template with attrribute "${settingName}"`);
    }
}
var sections = {};
// Add all settings to the sidebar
(_b = document.querySelectorAll("template[setting-name]")) === null || _b === void 0 ? void 0 : _b.forEach(template => {
    // the button that will be on the sidebar
    const name = template.getAttribute('setting-name');
    const listItem = document.createElement('button');
    listItem.setAttribute('href', template.getAttribute('href'));
    listItem.classList.add('item');
    listItem.innerText = name;
    listItem.addEventListener('click', e => {
        e.preventDefault();
        showSetting(name);
        pushParams({ content: template.getAttribute('href') });
    });
    // push to sections Object
    const section = template.getAttribute('section');
    if (!sections[section])
        sections[section] = [];
    if (section == "BetterDiscord")
        listItem.classList.add("bd-item");
    sections[section].push(listItem);
});
// render sections and buttons
for (let section in sections) {
    // section header
    // only push section header if string not empty
    if (section) {
        let heading;
        if (section == "BetterDiscord") {
            heading = document.createElement('div');
            heading.classList.add("bd-heading");
            heading.innerHTML = `
                <h2 class="section">${section}</h2>
                <button id="bd-changelog-btn" onclick="openModal('bd-changelog')">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" icon-data="history"/>
                    </svg>
                </button>
            `;
        }
        else {
            heading = document.createElement('h2');
            heading.classList.add('section');
            heading.innerText = section;
        }
        settingsList.appendChild(heading);
    }
    // render buttons in this section
    for (let button in sections[section]) {
        settingsList.appendChild(sections[section][button]);
    }
    // section divider
    const divider = document.createElement("hr");
    divider.classList.add("divider");
    settingsList.appendChild(divider);
}
{
    // Extra stuff that goes after sections (changelog, version, etc)
    settingsList.insertAdjacentHTML("beforeend", `
        <button class="item" onclick="openModal('changelog')">Change Log</button>
        <button class="item">HypeSquad</button>
        <hr class="divider">
        <button class="item" id="logout-btn">Log Out</button>
        <hr class="divider">

        <div class="social">
            <a href="" title="Twitter">
                <svg width="20" height="16" viewBox="0 0 20 16">
                    <path fill="currentColor" icon-data="twitter"/>
                </svg>
            </a>
            <a href="" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" icon-data="facebook"/>
                </svg>
            </a>
            <a href="" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" icon-data="instagram"/>
                </svg>
            </a>
            <a href="" title="BetterDiscord">
                <svg width="16" height="16" viewBox="0 0 2000 2000">
                    <path fill="currentColor" icon-data="betterDiscord.0"/>
                    <path fill="currentColor" icon-data="betterDiscord.1"/>
                </svg>
            </a>
        </div>

        <div class="info">
            <span>Discord Version</span>
            <span>Operating System</span>
        </div>
    `);
    settingsList.querySelectorAll("path[icon-data]").forEach(assignIconData);
}
activeBtnRelation(settingsList);
try {
    const button = settingsList.querySelector(`.item[href="${getUrlParams().content}"]`);
    button.classList.add('active');
    showSetting(button.innerText);
}
catch (_c) {
    console.error("Could not find a default setting. Settings content is blank");
    settingsList.querySelector(`.item[href="my-account"]`).classList.add('active');
    pushParams({ content: "my-account" });
    showSetting("My Account");
}
//# sourceMappingURL=settings.js.map