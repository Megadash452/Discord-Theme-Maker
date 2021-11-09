"use strict";
var _a;
;
;
;
(_a = document.querySelector("#notice button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    document.querySelector("#app-base").classList.remove("show-notice");
});
function getAcronym(str) {
    str = str.trim();
    let result = str[0];
    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] == ' ')
            result += str[i];
    }
    return result;
}
function appendTemplateElement(template, element, templateManipulator = (tmp) => { }) {
    let tmp = template.content.cloneNode(true);
    let first = tmp.querySelector("*");
    if (first == null) {
        console.error("Template", template, "does not contain any elements");
        return;
    }
    else
        templateManipulator(tmp);
    element.appendChild(tmp.cloneNode(true));
}
function appendTemplateNode(template, element, templateManipulator = (tmp) => { }) {
    let first = template.querySelector("*");
    if (first == null) {
        console.error("Template", template, "does not contain any elements");
        return;
    }
    else
        templateManipulator(template);
    element.appendChild(template.cloneNode(true));
}
function activeBtns(...btns) {
    // buttons will have a relationship where when one is clicked, it gets .active, but buttons with .active have the class removed
    for (let btn of btns)
        btn.addEventListener('click', () => {
            if (!btn.classList.contains("active")) {
                for (let btn of btns)
                    if (btn.classList.contains("active"))
                        btn.classList.remove("active");
                btn.classList.add("active");
            }
        });
}
function activeBtnArray(btns) {
    // take all buttons in Array and do what activeBtns does
    for (let btn of btns)
        btn.addEventListener('click', () => {
            if (!btn.classList.contains("active")) {
                for (let btn of btns)
                    if (btn.classList.contains("active"))
                        btn.classList.remove("active");
                btn.classList.add("active");
            }
        });
}
function activeBtnRelation(btnsHolder) {
    let btns = Array.from(btnsHolder.querySelectorAll("button"));
    activeBtnArray(btns);
}
function linkToTabs(btnsHolder) {
    for (let btn of Array.from(btnsHolder.querySelectorAll("[target]"))) {
        btn.addEventListener('click', () => {
            let element = document.querySelector(`.tab[name="${btn.getAttribute('target')}"]`);
            for (let tab of Array.from(element.parentElement.children))
                if (tab.matches(".tab.active"))
                    tab.classList.remove("active");
            element.classList.add("active");
        });
    }
}
function setToggleClasses(element, classes, target = element) {
    // * Empty class will kill the function
    element.addEventListener('click', () => {
        let index = classes.findIndex(// go through classes array. If one of the items matches a class of element, the index of that item will be returned
        // go through classes array. If one of the items matches a class of element, the index of that item will be returned
        item => target.matches(`.${item}`));
        if (index < 0) {
            target.classList.add(classes[0]);
            return;
        }
        target.classList.remove(classes[index]);
        if (index == classes.length - 1)
            target.classList.add(classes[0]);
        else
            target.classList.add(classes[index + 1]);
    });
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
                    // TODO: set #app-base .head content
                });
            });
        }
        else { // is server
            element = manageServer(guild).querySelector("li, .item");
            applyMaskAndBadge(element, guild.pings, guild.currentEvent);
            element.addEventListener('click', () => {
                setActiveGuild(element);
                // TODO: set #app-base .head content
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
    activeBtnArray(Array.from(document.querySelectorAll("#sidebar .channels .dm-channel[href]")));
    // activeBtnArray(
    //     Array.from(
    //         document.querySelectorAll("#servers .item")!
    //     )
    // );
    (_a = document.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
    (_b = document.querySelectorAll("#private-chats .dm-channel, #guilds .item[href]")) === null || _b === void 0 ? void 0 : _b.forEach(chat => {
        chat.addEventListener('click', e => {
            e.preventDefault();
            window.history.pushState({}, document.title, chat.getAttribute("href"));
        });
        console.log("when click", chat, ", will go to url:", chat.getAttribute("href"));
    });
}).catch(error => {
    console.log("error: ", error);
});
function assignIconData(path) {
    let name = path.getAttribute("icon-data");
    let rtrn = "";
    let hasSeparator = false;
    let separatorIndexes = [];
    for (let i = 0; i < name.length; i++) {
        let char = name[i];
        if (char == '.' || char == ' ') {
            hasSeparator = true;
            separatorIndexes.push(i);
        }
    }
    if (!hasSeparator) {
        let data = iconData[name];
        if (data === undefined) {
            console.error(`Icon <${name}> Data is invalid`);
        }
        else if (data.constructor === String) {
            rtrn = data;
        }
        else if (data.constructor === Array) {
            // data.forEach(str => {
            //     rtrn += str;
            // });
            rtrn = data[0];
            console.log(data.length);
            for (let i = 1; i < data.length; i++) {
                let element = document.createElement("path");
                element.setAttribute('class', path.getAttribute('class'));
                element.setAttribute('fill', "currentColor");
                element.setAttribute('d', data[i]);
                path.parentElement.appendChild(element);
                // ! TODO: the new element is appended, but for some reason doesn't render
            }
        }
    }
    else {
        let levels = [""];
        function getPathData(data, levels, level = 0) {
            let index_ = parseInt(levels[level]);
            let base;
            if (index_)
                base = data[index_];
            else
                base = data[levels[level]];
            if (base == undefined) {
                let type;
                if (data.constructor === Array)
                    type = "array";
                else
                    type = typeof data;
                console.error("Cannot set property of type", type, "in", name, "as SVG Path Data");
                return "";
            }
            else if (typeof base === "string")
                return base;
            else if (typeof base === "object")
                return getPathData(base, levels, level + 1);
            else
                return "";
        }
        let i = 0;
        for (let j = 0; j < name.length; j++)
            if (name[j] == '.' || name[j] == ' ') {
                levels.push("");
                i++;
            }
            else
                levels[i] += name[j];
        rtrn = getPathData(iconData, levels);
    }
    path.setAttribute('d', rtrn);
}
{
    let friendInput = document.getElementById("new-friend-search-bar");
    let form = friendInput.parentElement;
    let msg = form.nextElementSibling;
    function formNormal() {
        msg.classList.add("hidden");
        msg.classList.remove("error");
        msg.classList.remove("success");
        form.classList.remove("error");
        form.classList.remove("success");
    }
    function formError() {
        msg.classList.add("error");
        msg.classList.remove("hidden");
        msg.classList.remove("success");
        form.classList.add("error");
        form.classList.remove("success");
    }
    function formSuccess() {
        msg.classList.add("success");
        msg.classList.remove("error");
        msg.classList.remove("hidden");
        form.classList.add("success");
        form.classList.remove("error");
    }
    const hashIndex = () => friendInput.value.indexOf('#');
    const tag = () => friendInput.value.substring(hashIndex() + 1, friendInput.value.length);
    const tagInt = () => parseInt(tag());
    friendInput.parentElement.onsubmit = (e) => {
        e.preventDefault();
        if (hashIndex() < 0) {
            formError();
            msg.innerHTML = `We need ${friendInput.value}'s four digit tag so we know which one they are.`;
        }
        else if (tag().length < 4) {
            formError();
            msg.innerHTML = "Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.";
        }
        else {
            formSuccess();
            msg.innerHTML = `Success! Your friend request to <strong>${friendInput.value.replace("#" + tag(), '')}</strong> was sent.`;
        }
    };
    friendInput.addEventListener('input', (e) => {
        let overlay = friendInput.nextElementSibling;
        let submit = overlay.nextElementSibling;
        let charsInTag = 4;
        function ascii(index) {
            // -1 is last character
            if (index < 0)
                return friendInput.value.charCodeAt(friendInput.value.length + index);
            return friendInput.value.charCodeAt(index);
        }
        if (friendInput.value === "") {
            overlay.innerHTML = "";
            submit.disabled = true;
        }
        else if (hashIndex() > -1) {
            overlay.innerHTML = friendInput.value.substring(0, hashIndex()) + "#0000";
            if (friendInput.value.slice(-1) !== "#") {
                if ((ascii(-1) < 48 || ascii(-1) > 57) ||
                    friendInput.value.length - 1 - hashIndex() > charsInTag)
                    friendInput.value = friendInput.value.slice(0, -1);
            }
            submit.disabled = false;
            // maybe change the tag numbers in overlay???
        }
        else {
            overlay.innerHTML = friendInput.value + "#0000";
            submit.disabled = false;
        }
        formNormal();
    });
}
activeBtnRelation(document.querySelector("#main-content .head .tab-btns"));
linkToTabs(document.querySelector("#main-content .head .tab-btns"));
// ? sidebar.content="active-now" by default
appendTemplateElement(document.querySelector("#active-now-tmp"), document.querySelector("#main-content .sidebar > .scroller"));
//# sourceMappingURL=main.js.map