console.log("settings.ts");

const settingsList = document.getElementById("settings-list") as HTMLElement;
const settingsContent = document.getElementById("settings-content") as HTMLElement;


document.querySelectorAll("template[setting-name]").forEach(template => {
    template = template as HTMLTemplateElement;
    const name: string = template.getAttribute('setting-name')!;

    // the button that will be on the sidebar
    const listItem = document.createElement('button') as HTMLButtonElement;
    listItem.classList.add('item');
    listItem.innerText = name;

    listItem.addEventListener('click', () => {
        setPageContent("?content=" + template.getAttribute("href")!);

        return false;
    });

    // push to html
    settingsList.appendChild(listItem);
    appendTemplateElement(template, settingsContent);
    settingsContent.setAttribute('content', template.getAttribute("href")!);
});

activeBtnRelation(settingsList);