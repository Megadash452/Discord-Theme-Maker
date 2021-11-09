type UserStatus = "online" | "idle" | "offline" | "dnd" | "mobile";
interface PrivateChat {
    name: string,
    picture: string,
    unreads: number,
    href: string
};
interface Friend extends PrivateChat {
    status: UserStatus
};
interface GroupChat extends PrivateChat {
    memberCount: number
};

interface Server {
    name: string,
    picture: string,
    unreads: boolean,
    pings: number,
    currentEvent: "vc" | "stream" | "date",
    href: string
}
interface Folder {
    name: string,
    color: string
    state: "colapsed" | "opened",
    guilds: Array<Server>
}


document.querySelector("#notice button")?.addEventListener('click', () => {
    document.querySelector("#app-base")!.classList.remove("show-notice");
});



function getAcronym(str: string): string {
    str = str.trim();
    let result = str[0];

    for (let i=1; i < str.length; i++) {
        if (str[i - 1] == ' ')
            result += str[i];
    }

    return result;
}

function appendTemplateElement(template: HTMLTemplateElement, element: HTMLElement, templateManipulator = (tmp: HTMLElement) => {}) {
    let tmp = template.content.cloneNode(true) as HTMLElement;
    let first = tmp.querySelector("*") as HTMLElement;

    if (first == null) {
        console.error("Template", template,"does not contain any elements");
        return;
    } else
        templateManipulator(tmp);
    
    element.appendChild(tmp.cloneNode(true));
}
function appendTemplateNode(template: HTMLElement, element: HTMLElement, templateManipulator = (tmp: HTMLElement) => {}) {
    let first = template.querySelector("*") as HTMLElement;

    if (first == null) {
        console.error("Template", template,"does not contain any elements");
        return;
    } else
        templateManipulator(template);
    
    element.appendChild(template.cloneNode(true));
}


function activeBtns(...btns: Array<HTMLElement>) {
    // buttons will have a relationship where when one is clicked, it gets .active, but buttons with .active have the class removed
    for (let btn of btns)
        btn.addEventListener('click', () => {
            if (! btn.classList.contains("active")) {
                for (let btn of btns)
                    if (btn.classList.contains("active"))
                        btn.classList.remove("active");
                btn.classList.add("active");
            }
        });
}
function activeBtnArray(btns: Array<HTMLElement>) {
    // take all buttons in Array and do what activeBtns does
    for (let btn of btns)
        btn.addEventListener('click', () => {
            if (! btn.classList.contains("active")) {
                for (let btn of btns)
                    if (btn.classList.contains("active"))
                        btn.classList.remove("active");
                btn.classList.add("active");
            }
        });
}
function activeBtnRelation(btnsHolder: HTMLElement) {
    let btns = Array.from(btnsHolder.querySelectorAll("button"));
    activeBtnArray(btns);
}


function linkToTabs(btnsHolder: HTMLElement) {
    for (let btn of Array.from(btnsHolder.querySelectorAll("[target]"))) {
        btn.addEventListener('click', () => {
            let element = document.querySelector(`.tab[name="${btn.getAttribute('target')}"]`) as HTMLElement;

            for (let tab of Array.from(element.parentElement!.children))
                if (tab.matches(".tab.active"))
                    tab.classList.remove("active");

            element.classList.add("active");
        });
    }
}


function setToggleClasses(element: HTMLElement, classes: Array<string>, target=element) {
    // * Empty class will kill the function
    element.addEventListener('click', () => {
        let index = classes.findIndex( // go through classes array. If one of the items matches a class of element, the index of that item will be returned
            item => target.matches(`.${item}`)
        );
        if (index < 0) {
            target.classList.add(classes[0]);
            return;
        }

        target.classList.remove(classes[index]);

        if (index == classes.length - 1)
            target.classList.add(classes[0]);
        else
            target.classList.add(classes[index + 1])
    });
}



const homeBtn = document.getElementById("home-btn") as HTMLLIElement;
const guilds = document.getElementById("guilds") as HTMLElement;
let currentActiveGuild = document.getElementById("home-btn") as HTMLLIElement;
currentActiveGuild.classList.add("active");

function setActiveGuild(guild: HTMLLIElement) {
    removeAllActiveGuilds(); //currentActiveGuild.classList.remove("active");
    guild.classList.add("active");
    currentActiveGuild = guild as HTMLLIElement;
}
function removeActiveGuild() {
    currentActiveGuild.classList.remove("active");
}
function removeAllActiveGuilds() {
    guilds.querySelectorAll("li.active").forEach(guild => {
        guild.classList.remove("active");
    });
}

document.querySelectorAll("#home-btn, #servers li:not(.folder), #guilds .guild-actions").forEach(guild => {
    guild.addEventListener('click', () => {
        setActiveGuild(guild as HTMLLIElement);
    });
});
document.querySelectorAll("#dms-ping li").forEach(guild => {
    guild.addEventListener('click', () => {
        setActiveGuild(guild as HTMLLIElement);
        homeBtn.classList.add("active");
    });
});



// --- Appending servers and chats to navs

const dms = document.getElementById("private-chats") as HTMLElement;
const guildTmp = document.getElementById("guild-tmp") as HTMLTemplateElement;
const guildNoImgTmp = document.getElementById("guild-no-img-tmp") as HTMLTemplateElement;
const guildFolderTmp = document.getElementById("guild-folder-tmp") as HTMLTemplateElement;
const privateMsgTmp = document.getElementById("private-message-tmp") as HTMLTemplateElement;
const privateGroupTmp = document.getElementById("private-group-tmp") as HTMLTemplateElement;

function setUserStatus(svg: SVGElement, status: UserStatus) {
    //TODO:
}

function applyMaskAndBadge(guild: HTMLLIElement, pings: number, currentEvent="") {
    let mask = "url(#guild-";
    if (currentEvent == "vc" ||
        currentEvent == "stream" ||
        currentEvent == "date")
            mask += "upper-";

    // TODO: add upper badge

    else if (pings > 99)
        mask += "lower-3-";
    else if (pings > 9)
        mask += "lower-2-";
    if (pings > 0) {
        mask += "lower-1-";
        guild.innerHTML += `<span class="badge lower ping">${pings}</span>`;
    }

    guild.querySelector("foreignObject") ! .setAttribute('mask', mask + "mask)");
}

function appendToGuilds(chat: PrivateChat) {
    let element: HTMLLIElement = guildTmp.content.cloneNode(true) as HTMLLIElement;
    element = element.querySelector("li") as HTMLLIElement;
    element.classList.add("unreads")
    
    if (chat.picture)
        element.querySelector("img") ! .setAttribute('src', chat.picture);

    if (chat.unreads > 99) {
        element.querySelector("foreignObject") ! .setAttribute('mask', `url(#guild-lower-3-mask)`);
        element.innerHTML += `<span class="badge lower ping width-3">${chat.unreads}</span>`;
    } else if (chat.unreads > 9) {
        element.querySelector("foreignObject") ! .setAttribute('mask', `url(#guild-lower-2-mask)`);
        element.innerHTML += `<span class="badge lower ping width-2">${chat.unreads}</span>`;
    } else if (chat.unreads > 0) {
        element.querySelector("foreignObject") ! .setAttribute('mask', `url(#guild-lower-1-mask)`);
        element.innerHTML += `<span class="badge lower ping">${chat.unreads}</span>`;
    }
    // element.querySelector(""); // name

    element.addEventListener('click', () => {
        setActiveGuild(element as HTMLLIElement);
        homeBtn.classList.add("active");
    });

    document.getElementById("dms-ping")!.appendChild(element);
}

function writePrivateChats(data: Array<any>) { // Array<Friend | GroupChat>
    data.forEach(dm => {
        let element: HTMLAnchorElement;

        if (dm.hasOwnProperty('status')) { // is user
            element = privateMsgTmp.content.cloneNode(true) as HTMLAnchorElement;
            setUserStatus(element.querySelector("svg") as SVGSVGElement, dm.status);
        } else { // is group chat
            element = privateGroupTmp.content.cloneNode(true) as HTMLAnchorElement;
            element.querySelector(".subtitle") ! .innerHTML = `${dm.memberCount} members`;
        }
        element = element.querySelector("*") as HTMLAnchorElement;
        
        if (dm.picture)
            element.querySelector("img") ! .setAttribute('src', dm.picture);

        element.setAttribute('href', dm.href);
        element.querySelector(".title") ! .innerHTML = dm.name;

        dms!.appendChild(element);

        if (dm.unreads > 0)
            appendToGuilds(dm as PrivateChat);
    });
}

function writeServers(data: Array<any>) {
    data.forEach(guild => {
        let element: HTMLLIElement;

        if (guild.hasOwnProperty('guilds')) { // is folder
            element = guildFolderTmp.content.cloneNode(true) as HTMLLIElement;
            element = element.querySelector("li, .item") as HTMLLIElement;

            element.classList.add(guild.state);

            if (guild.color === "default" || guild.color === "")
                element.querySelector(".icons") ! .setAttribute('style', "background: #5865f266; color: #5865f2");
            else 
                element.querySelector(".icons") ! .setAttribute('style', `background: ${guild.color}66; color: ${guild.color}`);

            let pings = 0;
            let event: "vc" | "" = "";
            for (let server of guild.guilds) {
                if ((server.unreads || server.pings > 0) &&
                    !element.classList.contains("unreads")) {
                    element.classList.add("unreads");
                }
                pings += server.pings;
                if (server.currentEvent == "vc")
                    event = "vc";

                element.querySelector(".guilds") ! .appendChild(
                    manageServer(server).querySelector("li, .item")!
                );
            }
            applyMaskAndBadge(element, pings, event);
            setToggleClasses(
                element.querySelector("svg.icon") as HTMLElement,
                ["collapsed", "opened"], element
            );
            element.querySelectorAll("li.item").forEach(server => {
                server.addEventListener('click', () => {
                    setActiveGuild(server as HTMLLIElement);
                    element.classList.add("active");
                });
            });
        } else { // is server
            element = manageServer(guild).querySelector("li, .item") as HTMLLIElement;
            applyMaskAndBadge(
                element,
                guild.pings, guild.currentEvent
            );
            element.addEventListener('click', () => {
                setActiveGuild(element);
            });
        }
        document.getElementById("servers") ! .appendChild(element);
    });

    function manageServer(server: Server): HTMLLIElement {
        let element: HTMLLIElement;

        if (!server.picture) { // is server no-img
            element = guildNoImgTmp.content.cloneNode(true) as HTMLLIElement;
            element.querySelector(".title") ! .innerHTML = getAcronym(server.name);
        } else { // is normal server
            element = guildTmp.content.cloneNode(true) as HTMLLIElement;
            element.querySelector("img") ! .setAttribute('src', server.picture);
        }

        if (server.unreads || server.pings > 0)
            element.querySelector("li, .item") ! .classList.add("unreads");

        return element;
    }
}



// TODO: SET UP LOCALHOST
fetch("script/data/chats.json").then(
    response => response.json()
).then(json => {
    writePrivateChats(json.privateChats);
    writeServers(json.servers);

    activeBtnArray(
        Array.from(
            document.querySelectorAll("#sidebar .channels .dm-channel[href]")!
        )
    );
    // activeBtnArray(
    //     Array.from(
    //         document.querySelectorAll("#servers .item")!
    //     )
    // );

    document.querySelectorAll("path[icon-data]")?.forEach(assignIconData);
    document.querySelectorAll("#private-chats .dm-channel, #guilds .item[href]")?.forEach(chat => {
        chat.addEventListener('click', e => {
            e.preventDefault()
            window.history.pushState({}, document.title, chat.getAttribute("href"));
        });
        console.log("when click", chat, ", will go to url:", chat.getAttribute("href"));
    });
}).catch(error => {
    console.log("error: ", error);
});