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

interface ServerGuild {
    name: string,
    picture: string,
    unreads: boolean,
    pings: number,
    currentEvent: "vc" | "stream" | "date",
    href: string
}
interface Folder {
    name: string,
    color: string,
    state: "colapsed" | "opened",
    guilds: Array<ServerGuild>
}

interface Reaction {
    // user id
    sender: number,
    emoji: string
}
interface Message {
    sender: number, // user id
    date: string, // mm/dd/yyy OR day-of-week/"Tooday" at 12-hour-time
    text: string,
    edited?: boolean,
    replyTo?: number, // index of message/message id
    reactions?: Array<Reaction>,
    embeds?: Array<string>
}
interface GroupChatObj {
    name: string,
    avatarUrl: string,
    owner: string, // user id
    members: Array<number>, // user ids
    messages: Array<Message>
}


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
    activeBtnArray(
        Array.from(btnsHolder.querySelectorAll("button"))
    );
}


function activeRadios(...radios: Array<HTMLElement>) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtns
    for (let radio of radios)
        if (radio.matches(":not(input[name])"))
            radio.addEventListener('click', () => {
                if (! radio.classList.contains("active")) {
                    for (let radio of radios)
                        if (radio.classList.contains("active"))
                            radio.classList.remove("active");
                    radio.classList.add("active");
                }
            });
}
function activeRadioArray(radios: Array<HTMLElement>) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtnArray
    for (let radio of radios)
        if (radio.matches(":not(input[name])"))
            radio.addEventListener('click', () => {
                if (! radio.classList.contains("active")) {
                    for (let radio of radios)
                        if (radio.classList.contains("active"))
                            radio.classList.remove("active");
                    radio.classList.add("active");
                }
            });
}
function activeRadioRelation(radiosHolder: HTMLElement) {
    // emulate the functionality of <input type="radio" name="">
    // similar to activeBtnRelation
    activeRadioArray(
        Array.from(radiosHolder.querySelectorAll(".radio, .radio-group > li, .radio-group > .item"))
    );
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