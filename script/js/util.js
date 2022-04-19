"use strict";
;
;
;
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
    if (tmp.querySelector("*") == null) {
        console.error("Template", template, "does not contain any elements");
        return;
    }
    else
        templateManipulator(tmp);
    element.appendChild(tmp);
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
    activeBtnArray(Array.from(btnsHolder.querySelectorAll("button")));
}
function activeRadios(...radios) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtns
    for (let radio of radios)
        if (radio.matches(":not(input[name])"))
            radio.addEventListener('click', () => {
                if (!radio.classList.contains("active")) {
                    for (let radio of radios)
                        if (radio.classList.contains("active"))
                            radio.classList.remove("active");
                    radio.classList.add("active");
                }
            });
}
function activeRadioArray(radios) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtnArray
    for (let radio of radios)
        if (radio.matches(":not(input[name])"))
            radio.addEventListener('click', () => {
                if (!radio.classList.contains("active")) {
                    for (let radio of radios)
                        if (radio.classList.contains("active"))
                            radio.classList.remove("active");
                    radio.classList.add("active");
                }
            });
}
function activeRadioRelation(radiosHolder) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtnRelation
    activeRadioArray(Array.from(radiosHolder.querySelectorAll(".radio, .radio-group > li, .radio-group > .item")));
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
// Create a user element from each user-id in array using script/data/user.json, and append it to *element*
function appendGroupMemberElements(element, userIds, ownerId) {
    let tmp = document.getElementById("member-tmp");
    if (!tmp) {
        console.error("Template for member not found");
        return;
    }
    fetch("script/data/users.json").then(response => response.json()).then(json => {
        var _a, _b;
        for (let userId of userIds) {
            // The member Element to be appended
            let memEl = tmp.content.cloneNode(true);
            let member = json[`${userId}`];
            if (member == null) {
                console.error("Member with id <" + userId + "> not found");
                // continue;
                member = {
                    avatar: "$userPfp",
                    username: "$uid: " + userId
                };
            }
            (_a = memEl.querySelector(".avatar img, img.avatar")) === null || _a === void 0 ? void 0 : _a.setAttribute('src', member.avatar);
            // Status Badge
            if (member.status == "offline" && member.friend)
                (_b = memEl.querySelector("li.item")) === null || _b === void 0 ? void 0 : _b.classList.add("offline");
            else if (member.status != "offline") {
                // TODO: normal status badge (online, idle, etc.)
            }
            // Name
            memEl.querySelector(".title .name").innerText = member.username;
            // Owner Icon
            if (userId == ownerId) {
                memEl.querySelector(".title .owner-icon").style.display = "block";
                assignIconData(memEl.querySelector(".title .owner-icon path[icon-data]"));
            }
            else
                memEl.querySelector(".title .owner-icon").remove();
            // Subtitle
            if (member.description) {
                memEl.querySelector(".subtitle .description").innerText = member.description;
                memEl.querySelector(".subtitle .activity-icon").remove();
            }
            else if (member.activity) {
                memEl.querySelector(".subtitle .description").innerText = member.activity;
                memEl.querySelector(".subtitle .activity-icon").style.display = "block";
                assignIconData(memEl.querySelector(".subtitle .activity-icon path[icon-data]"));
            }
            else
                memEl.querySelector(".subtitle").style.display = "none";
            element === null || element === void 0 ? void 0 : element.appendChild(memEl);
        }
    });
}
//# sourceMappingURL=util.js.map