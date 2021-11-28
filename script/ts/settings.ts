const settingsList = document.getElementById("settings-list") as HTMLElement;
const settingsContent = document.getElementById("settings-content") as HTMLElement;

document.querySelectorAll<SVGPathElement>("path[icon-data]")?.forEach(assignIconData);


function showSetting(settingName: string) {
    const template = document.querySelector<HTMLTemplateElement>(`template[setting-name="${settingName}"]`);

    // if (template) {
    //     // clear settingsContent
    //     settingsContent.innerHTML = "";

    //     appendTemplateElement(template, settingsContent, tmp => {
    //         // set data for each path in the setting content
    //         tmp.querySelectorAll<SVGPathElement>("path[icon-data]").forEach(assignIconData);
    //     });
    //     settingsContent.setAttribute('content', template.getAttribute("href")!);
    // } else
    //     console.error(`Could not find template with attrribute "${settingName}"`);

    try {
        appendTemplateElement(template!, settingsContent, tmp => {
            // set data for each path in the setting content
            settingsContent.innerHTML = "";
            tmp.querySelectorAll<SVGPathElement>("path[icon-data]").forEach(assignIconData);
            settingsContent.setAttribute('content', template!.getAttribute("href")!);
        });
    } catch {
        console.error(`Could not find template with attrribute "${settingName}"`);
    }
}


var sections: {[index: string]: Array<HTMLButtonElement>} = {

};
// Add all settings to the sidebar
document.querySelectorAll<HTMLTemplateElement>("template[setting-name]")?.forEach(template => {
    // the button that will be on the sidebar
    const name = template.getAttribute('setting-name')!;
    const listItem = document.createElement('button') as HTMLButtonElement;
    listItem.setAttribute('href', template.getAttribute('href')!);
    listItem.classList.add('item');
    listItem.innerText = name;

    listItem.addEventListener('click', e => {
        e.preventDefault();
        showSetting(name);
        pushParams({content: template.getAttribute('href')!});
    });

    // push to sections Object
    const section = template.getAttribute('section')!;
    if (!sections[section])
        sections[section] = [];

    sections[template.getAttribute('section')!].push(listItem);
});

for (let section in sections) {
    const heading = document.createElement('h2') as HTMLHeadingElement;
    heading.classList.add('section');
    heading.innerText = section;
    settingsList.appendChild(heading);

    for (let button in sections[section]) {
        settingsList.appendChild(sections[section][button]);
    }
}
activeBtnRelation(settingsList);


let settingHref = getUrlParams().content;


try {
    if (settingHref) {
        const button = settingsList.querySelector(`.item[href="${settingHref}"]`) as HTMLButtonElement;
        button.classList.add('active');
        showSetting(button.innerText);
    } else {
        settingsList.querySelector(`.item[href="my-account"]`)!.classList.add('active');
        showSetting("My Account");
    }
} catch {
    console.error("Could not find a default setting. Settings content is blank");
}