document.querySelectorAll(".theme-item").forEach(item => {
    item.addEventListener('click', () => {
        // pushUrl(`themes/?id=${item.getAttribute("theme-id")}`);
        setLocation(`themes/?id=${item.getAttribute("theme-id")}&page=channels`)
    });
});

