"use strict";
const settingsList = document.getElementById("settings-list");
const settingsContent = document.getElementById("settings-content");
document.onload = () => {
    document.querySelectorAll("template[setting-name]").forEach(template => {
        const listItem = new HTMLElement;
        const name = template.getAttribute('settin-name');
        listItem.classList.add('item');
        listItem.addEventListener('click', () => {
            setPageContent("?content=" + template.getAttribute("href"));
            return false;
        });
        settingsList.appendChild(listItem);
    });
    activeBtnRelation(settingsList);
};
//# sourceMappingURL=settings.js.map