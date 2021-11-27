document.querySelector("#notice button")?.addEventListener('click', () => {
    document.querySelector("#app-base")!.classList.remove("show-notice");
});


function toggleMute() {
    let muteBtn = document.querySelector("#mute-btn") as HTMLButtonElement;
    let paths = muteBtn.querySelectorAll("svg path") as NodeListOf<SVGPathElement>;

    if (muteBtn.matches(".muted")) {
        muteBtn.classList.add("unmuted");
        muteBtn.classList.remove("muted");
        paths[0].setAttribute('icon-data', "microphone.unmuted.0");
        paths[1].setAttribute('icon-data', "microphone.unmuted.1");
    } else {
        muteBtn.classList.add("muted");
        muteBtn.classList.remove("unmuted");
        paths[0].setAttribute('icon-data', "microphone.muted.0");
        paths[1].setAttribute('icon-data', "microphone.muted.1");
        paths[1].classList.add("strike-through");
    }

    assignIconData(paths[0]);
    assignIconData(paths[1]);
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


fetch("script/data/chats.json").then(
    response => response.json()
).then(json => {
    writePrivateChats(json.privateChats);
    writeServers(json.servers);

    document.querySelectorAll("path[icon-data]")?.forEach(assignIconData);

    document.querySelectorAll("#private-chats .dm-channel")?.forEach(chat => { // TODO: , #guilds .item[href]
        chat.addEventListener('click', e => {
            e.preventDefault();
            if (chat.classList.contains("active"))
                return;

            let urlParams = parseUrlParams();
            urlParams.content = chat.getAttribute("href")!.split("chats-data/")[1].split(".json")[0];
            setUrl("themes/?" + urlParams.str());
            setPageContent();
        });
    });

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
}).catch(error => {
    console.log("error: ", error);
    document.querySelectorAll("path[icon-data]")?.forEach(assignIconData);
});