console.log("url.ts, file does not defer");
console.log(window.location);


console.log("")

function getUrlParams() {
    let url = window.location.href;
    let paramsStart = url.indexOf('?') + 1;
    console.log(url[paramsStart]);
    let params = {};

    let nameBuf = "";
    let val = "";
    let eqIndex = 0;
    let storeIn = "nameBuf";

    for (let i = paramsStart; i< url.length; i++) {
        let c = url[i];

        if (url[i] == '=') {
            storeIn = "val";
        } else if (url[i] == '&') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            params[nameBuf] = val; // @ts-ignore
            storeIn = "nameBuf";
        } else
            if (storeIn == "nameBuf")
                nameBuf += url[i];
            else if (storeIn == "val")
                val += url[i];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    params[nameBuf] = val; // @ts-ignore
    return params;
}
var urlParams = getUrlParams();

// document.querySelector("base")?.setAttribute('href', window.location.origin);
document.querySelector('meta[name="theme-id"]')?.setAttribute('href', ""); // TODO
document.querySelector('meta[name="page"]')?.setAttribute('href', ""); // TODO
document.querySelector('meta[name="section"]')?.setAttribute('href', ""); // TODO
document.querySelector('meta[name="content"]')?.setAttribute('href', ""); // TODO