console.log("ui.ts");

type Checkbox = HTMLInputElement;


const toggleSidebar = () => {
    document.querySelector("#menu-side-bar") !
        .classList.toggle("active");
    document.querySelector("#page-filter") !
        .classList.toggle("active");
};
const collapseSidebar = () => {
    document.querySelector("#menu-side-bar") !
        .classList.remove("active");
    document.querySelector("#page-filter") !
        .classList.remove("active");
};
const openSidebar = () => {
    document.querySelector("#menu-side-bar") !
        .classList.remove("active");
    document.querySelector("#page-filter") !
        .classList.remove("active");
};


const toggleCheckbox = (checkbox: Checkbox) => {
    if (checkbox.checked)
        uncheckCheckbox(checkbox);
    else
        checkCheckbox(checkbox);
};
const checkCheckbox = (checkbox: Checkbox) => {
    checkbox.setAttribute("checked", "");
    checkbox.checked = true;
};
const uncheckCheckbox = (checkbox: Checkbox) => {
    checkbox.removeAttribute("checked");
    checkbox.checked = false;
};



const themeSwitch = document.getElementById("theme-switch") as HTMLInputElement;
const prefersLightMode = window.matchMedia("(prefers-color-scheme: light)");

if (prefersLightMode.matches) {
    document.body.classList.add("light");
    if (themeSwitch) uncheckCheckbox(themeSwitch);
} else {
    document.body.classList.add("dark");
    if (themeSwitch) checkCheckbox(themeSwitch);
}

prefersLightMode.onchange = (e) => {
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



document.querySelector(
    `span.switch, span.toggle, span.toggler`
);



document.querySelectorAll(   // * Goes last
    `input[type="checkbox"].switch, input[type="checkbox"].toggle, input[type="checkbox"].toggler`
) ! .forEach(element => {
    ((checkbox: Checkbox) => {
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
    })(element as Checkbox);
});