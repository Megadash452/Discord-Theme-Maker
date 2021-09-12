console.log("ui.js");

const toggleSideBar = () => {
    document.querySelector("#menu-side-bar")
        .classList.toggle("active");
    document.querySelector("#page-filter")
        .classList.toggle("active");
}

const collapseSideBar = () => {
    document.querySelector("#menu-side-bar")
        .classList.remove("active");
    document.querySelector("#page-filter")
        .classList.remove("active");
}


const toggleCheckbox = (checkbox) => {
    if (checkbox.checked)
        uncheckCheckbox(checkbox);
    else
        checkCheckbox(checkbox);
}
const checkCheckbox = (checkbox) => {
    checkbox.setAttribute("checked", "");
    checkbox.checked = true;
}
const uncheckCheckbox = (checkbox) => {
    checkbox.removeAttribute("checked");
    checkbox.checked = false;
}


let themeSwitch = document.getElementById("theme-switch");

if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.body.classList.add("light");
    if (themeSwitch) uncheckCheckbox(themeSwitch);
} else {
    document.body.classList.add("dark");
    if (themeSwitch) checkCheckbox(themeSwitch);
}

window.matchMedia("(prefers-color-scheme: light)").onchange = (e) => {
    if (e.matches) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        if (themeSwitch) uncheckCheckbox(themeSwitch);
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        if (themeSwitch) checkCheckbox(themeSwitch);
    }
};

themeSwitch?.addEventListener('click', () => {
    if (themeSwitch.checked) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
});


document.querySelectorAll(   // * Goes last
    `input[type="checkbox"].switch, input[type="checkbox"].toggle, input[type="checkbox"].toggler`
).forEach(checkbox => {
    if (checkbox.checked)
        checkbox.setAttribute("checked", "");
    else
        checkbox.removeAttribute("checked");
            
    checkbox.addEventListener('click', () => {
        if (checkbox.checked)
            checkbox.setAttribute("checked", "");
        else
            checkbox.removeAttribute("checked");
    });
});