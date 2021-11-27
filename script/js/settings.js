"use strict";
console.log("settings.ts");
const settingsList = document.getElementById("settings-list");
const settingsContent = document.getElementById("settings-content");
document.querySelectorAll("template[setting-name]").forEach(template => {
    template = template;
    const name = template.getAttribute('setting-name');
    // the button that will be on the sidebar
    const listItem = document.createElement('button');
    listItem.classList.add('item');
    listItem.innerText = name;
    listItem.addEventListener('click', () => {
        setPageContent("?content=" + template.getAttribute("href"));
        return false;
    });
    // push to html
    settingsList.appendChild(listItem);
    appendTemplateElement(template, settingsContent);
    settingsContent.setAttribute('content', template.getAttribute("href"));
});
activeBtnRelation(settingsList);
//# sourceMappingURL=settings.js.map