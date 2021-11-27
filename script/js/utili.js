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
//# sourceMappingURL=utili.js.map