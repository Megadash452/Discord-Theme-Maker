"use strict";
var _a;
(_a = document.querySelector("#notice button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    document.querySelector("#app-base").classList.remove("show-notice");
});
function toggleMute() {
    let muteBtn = document.querySelector("#mute-btn");
    let paths = muteBtn.querySelectorAll("svg path");
    if (muteBtn.matches(".muted")) {
        muteBtn.classList.add("unmuted");
        muteBtn.classList.remove("muted");
        paths[0].setAttribute('icon-data', "microphone.unmuted.0");
        paths[1].setAttribute('icon-data', "microphone.unmuted.1");
    }
    else {
        muteBtn.classList.add("muted");
        muteBtn.classList.remove("unmuted");
        paths[0].setAttribute('icon-data', "microphone.muted.0");
        paths[1].setAttribute('icon-data', "microphone.muted.1");
        paths[1].classList.add("strike-through");
    }
    assignIconData(paths[0]);
    assignIconData(paths[1]);
}
function toggleDeafen() {
}
function openSettings() {
    window.location.href = "themes/settings/index.html";
}
const homeBtn = document.getElementById("home-btn");
const guilds = document.getElementById("guilds");
let currentActiveGuild = document.getElementById("home-btn");
currentActiveGuild.classList.add("active");
function setActiveGuild(guild) {
    removeAllActiveGuilds(); //currentActiveGuild.classList.remove("active");
    guild.classList.add("active");
    currentActiveGuild = guild;
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
        setActiveGuild(guild);
    });
});
document.querySelectorAll("#dms-ping li").forEach(guild => {
    guild.addEventListener('click', () => {
        setActiveGuild(guild);
        homeBtn.classList.add("active");
    });
});
// --- Appending servers and chats to navs
const dms = document.getElementById("private-chats");
const guildTmp = document.getElementById("guild-tmp");
const guildNoImgTmp = document.getElementById("guild-no-img-tmp");
const guildFolderTmp = document.getElementById("guild-folder-tmp");
const privateMsgTmp = document.getElementById("private-message-tmp");
const privateGroupTmp = document.getElementById("private-group-tmp");
function setUserStatus(svg, status) {
    //TODO:
}
function applyMaskAndBadge(guild, pings, currentEvent = "") {
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
    guild.querySelector("foreignObject").setAttribute('mask', mask + "mask)");
}
function appendToGuilds(chat) {
    let element = guildTmp.content.cloneNode(true);
    element = element.querySelector("li");
    element.classList.add("unreads");
    if (chat.picture)
        element.querySelector("img").setAttribute('src', chat.picture);
    if (chat.unreads > 99) {
        element.querySelector("foreignObject").setAttribute('mask', `url(#guild-lower-3-mask)`);
        element.innerHTML += `<span class="badge lower ping width-3">${chat.unreads}</span>`;
    }
    else if (chat.unreads > 9) {
        element.querySelector("foreignObject").setAttribute('mask', `url(#guild-lower-2-mask)`);
        element.innerHTML += `<span class="badge lower ping width-2">${chat.unreads}</span>`;
    }
    else if (chat.unreads > 0) {
        element.querySelector("foreignObject").setAttribute('mask', `url(#guild-lower-1-mask)`);
        element.innerHTML += `<span class="badge lower ping">${chat.unreads}</span>`;
    }
    // element.querySelector(""); // name
    element.addEventListener('click', () => {
        setActiveGuild(element);
        homeBtn.classList.add("active");
    });
    document.getElementById("dms-ping").appendChild(element);
}
function writePrivateChats(data) {
    data.forEach(dm => {
        let element;
        if (dm.hasOwnProperty('status')) { // is user
            element = privateMsgTmp.content.cloneNode(true);
            setUserStatus(element.querySelector("svg"), dm.status);
        }
        else { // is group chat
            element = privateGroupTmp.content.cloneNode(true);
            element.querySelector(".subtitle").innerHTML = `${dm.memberCount} members`;
        }
        element = element.querySelector("*");
        if (dm.picture)
            element.querySelector("img").setAttribute('src', dm.picture);
        element.setAttribute('href', dm.href);
        element.querySelector(".title").innerHTML = dm.name;
        dms.appendChild(element);
        if (dm.unreads > 0)
            appendToGuilds(dm);
    });
}
function writeServers(data) {
    data.forEach(guild => {
        let element;
        if (guild.hasOwnProperty('guilds')) { // is folder
            element = guildFolderTmp.content.cloneNode(true);
            element = element.querySelector("li, .item");
            element.classList.add(guild.state);
            if (guild.color === "default" || guild.color === "")
                element.querySelector(".icons").setAttribute('style', "background: #5865f266; color: #5865f2");
            else
                element.querySelector(".icons").setAttribute('style', `background: ${guild.color}66; color: ${guild.color}`);
            let pings = 0;
            let event = "";
            for (let server of guild.guilds) {
                if ((server.unreads || server.pings > 0) &&
                    !element.classList.contains("unreads")) {
                    element.classList.add("unreads");
                }
                pings += server.pings;
                if (server.currentEvent == "vc")
                    event = "vc";
                element.querySelector(".guilds").appendChild(manageServer(server).querySelector("li, .item"));
            }
            applyMaskAndBadge(element, pings, event);
            setToggleClasses(element.querySelector("svg.icon"), ["collapsed", "opened"], element);
            element.querySelectorAll("li.item").forEach(server => {
                server.addEventListener('click', () => {
                    setActiveGuild(server);
                    element.classList.add("active");
                });
            });
        }
        else { // is server
            element = manageServer(guild).querySelector("li, .item");
            applyMaskAndBadge(element, guild.pings, guild.currentEvent);
            element.addEventListener('click', () => {
                setActiveGuild(element);
            });
        }
        document.getElementById("servers").appendChild(element);
    });
    function manageServer(server) {
        let element;
        if (!server.picture) { // is server no-img
            element = guildNoImgTmp.content.cloneNode(true);
            element.querySelector(".title").innerHTML = getAcronym(server.name);
        }
        else { // is normal server
            element = guildTmp.content.cloneNode(true);
            element.querySelector("img").setAttribute('src', server.picture);
        }
        if (server.unreads || server.pings > 0)
            element.querySelector("li, .item").classList.add("unreads");
        return element;
    }
}
fetch("script/data/chats.json").then(response => response.json()).then(json => {
    var _a, _b;
    writePrivateChats(json.privateChats);
    writeServers(json.servers);
    (_a = document.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
    (_b = document.querySelectorAll("#private-chats .dm-channel")) === null || _b === void 0 ? void 0 : _b.forEach(chat => {
        // set the content url parameter
        chat.addEventListener('click', e => {
            e.preventDefault();
            if (chat.classList.contains("active"))
                return;
            let urlParams = parseUrlParams();
            urlParams.content = chat.getAttribute("href").split("chats-data/")[1].split(".json")[0];
            setUrl("themes/?" + urlParams.str());
            setPageContent();
        });
        // show the chat content
        chat.addEventListener('click', () => {
            const chatUrl = chat.getAttribute('href');
            fetch("script/data/" + chatUrl).then(response => response.json()).then(json => {
                // set the name of the ocntent that is being displayed at #main-content
                document.getElementById("main-content").setAttribute('content', chatUrl.replace(RegExp("chats-data/"), '')
                    .replace(RegExp(".json"), ''));
                // dm-channels content can only be of type .dm.json or .gc.json
                if (chatUrl.indexOf(".dm.json") > -1)
                    displayPrivateChat(json);
                else if (chatUrl.indexOf(".gc.json") > -1)
                    displayGroupChat(json);
                else
                    console.error("invalid file type for chat: " + chatUrl);
            });
        });
    });
    activeBtnArray(Array.from(document.querySelectorAll("#sidebar .channels .dm-channel[href]")));
    // activeBtnArray(
    //     Array.from(
    //         document.querySelectorAll("#servers .item")!
    //     )
    // );
}).catch(error => {
    var _a;
    console.log("error: ", error);
    (_a = document.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
});
//# sourceMappingURL=main.js.map