const settingsList = document.getElementById("settings-list") as HTMLElement;
const settingsContent = document.getElementById("settings-content") as HTMLElement;

document.onload = () => {
    document.querySelectorAll("template[setting-name]").forEach(template => {
        const listItem = new HTMLElement;
        const name: string = template.getAttribute('settin-name')!;
        listItem.classList.add('item');

        listItem.addEventListener('click', () => {
            setPageContent("?content=" + template.getAttribute("href")!);

            return false;
        });
        settingsList.appendChild(listItem);
    });
    
    activeBtnRelation(settingsList);
}