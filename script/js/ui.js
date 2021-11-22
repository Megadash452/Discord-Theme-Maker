"use strict";
console.log("ui.ts");
const toggleSidebar = () => {
    document.querySelector("#menu-side-bar")
        .classList.toggle("active");
    document.querySelector("#page-filter")
        .classList.toggle("active");
};
const collapseSidebar = () => {
    document.querySelector("#menu-side-bar")
        .classList.remove("active");
    document.querySelector("#page-filter")
        .classList.remove("active");
};
const openSidebar = () => {
    document.querySelector("#menu-side-bar")
        .classList.remove("active");
    document.querySelector("#page-filter")
        .classList.remove("active");
};
const toggleCheckbox = (checkbox) => {
    if (checkbox.checked)
        uncheckCheckbox(checkbox);
    else
        checkCheckbox(checkbox);
};
const checkCheckbox = (checkbox) => {
    checkbox.setAttribute("checked", "");
    checkbox.checked = true;
};
const uncheckCheckbox = (checkbox) => {
    checkbox.removeAttribute("checked");
    checkbox.checked = false;
};
const themeSwitch = document.getElementById("theme-switch");
const prefersLightMode = window.matchMedia("(prefers-color-scheme: light)");
if (prefersLightMode.matches) {
    document.body.classList.add("light");
    if (themeSwitch)
        uncheckCheckbox(themeSwitch);
}
else {
    document.body.classList.add("dark");
    if (themeSwitch)
        checkCheckbox(themeSwitch);
}
prefersLightMode.onchange = (e) => {
    if (e.matches) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        if (themeSwitch)
            uncheckCheckbox(themeSwitch);
    }
    else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        if (themeSwitch)
            checkCheckbox(themeSwitch);
    }
};
themeSwitch === null || themeSwitch === void 0 ? void 0 : themeSwitch.addEventListener('click', () => {
    if (themeSwitch.checked) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    }
    else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
});
// document.querySelectorAll(`.radio:has(input[type="radio"])`) ! .forEach(element => {
//     // ((wrapper: RadioWrapper) => {
//     // })(element as RadioWrapper);
// });
//# sourceMappingURL=ui.js.map