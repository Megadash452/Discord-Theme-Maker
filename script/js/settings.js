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
    sections[template.getAttribute('section')].push(listItem);
});
for (let section in sections) {
    const heading = document.createElement('h2');
    heading.classList.add('section');
    heading.innerText = section;
    settingsList.appendChild(heading);
    for (let button in sections[section]) {
        settingsList.appendChild(sections[section][button]);
    }
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