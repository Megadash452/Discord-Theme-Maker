const settingsList = document.getElementById("settings-list") as HTMLElement;
const settingsContent = document.getElementById("settings-content") as HTMLElement;

document.querySelectorAll<SVGPathElement>("path[icon-data]")?.forEach(assignIconData);


function showSetting(settingName: string) {
    const template = document.querySelector(`template[setting-name="${settingName}"]`) as HTMLTemplateElement;

    try {
        appendTemplateElement(template, settingsContent, tmp => {
            settingsContent.innerHTML = "";
            tmp.querySelectorAll<SVGPathElement>("path[icon-data]").forEach(assignIconData);
            settingsContent.setAttribute('content', template.getAttribute("href")!);
        });

        // These cannot go in the template handler because the events will be deleted
        // add functionality to radio buttons
        settingsContent.querySelectorAll<HTMLElement>(".radio-group").forEach(activeRadioRelation);
        // add functionality to togglers/switches (checkboxes)
        settingsContent.querySelectorAll(
            ".switch:not(input[type=\"checkbox\"])," +
            ".toggle:not(input[type=\"checkbox\"])," +
            ".toggler:not(input[type=\"checkbox\"])"
        ).forEach(element => {
            element.addEventListener('click', () => {
                element.classList.toggle("active");
            });
        });
    } catch {
        console.error(`Could not find template with attribute "${settingName}"`);
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
        // set the url to current setting
        e.preventDefault();
        showSetting(name);
        setParams({content: template.getAttribute('href')!});
    });

    // push to sections Object
    const section = template.getAttribute('section')!;
    if (!sections[section])
        sections[section] = [];

    // add the nitro icon to the nitro setting in the sidebar
    if (name == "Discord Nitro") {
        listItem.classList.add("has-icon");
        listItem.innerHTML += `
            <svg width="20" height="14" viewBox="0 0 20 14">
                <path fill="url(#nitro-gradient)" icon-data="nitro2" d="${iconData.nitro2}"/>
            </svg>
        `;
    }

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
            heading.classList.add("bd-heading")
            heading.innerHTML = `
                <h2 class="section">${section}</h2>
                <button id="bd-changelog-btn" onclick="openModal('bd-changelog')">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" icon-data="history"/>
                    </svg>
                </button>
            `;
        } else {
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
    divider.classList.add("divider")
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
    settingsList.querySelectorAll<SVGPathElement>("path[icon-data]").forEach(assignIconData);
}
activeBtnRelation(settingsList);


try {
    const button = settingsList.querySelector(`.item[href="${getUrlParams().content}"]`) as HTMLButtonElement;
    button.classList.add('active');
    showSetting(button.innerText);
} catch {
    console.error("Setting <"+ getUrlParams().content +"> does not exist, defaulting to \"my-account\"");
    settingsList.querySelector(`.item[href="my-account"]`)!.classList.add('active');
    setParams({content: "my-account"});
    showSetting("My Account");
}