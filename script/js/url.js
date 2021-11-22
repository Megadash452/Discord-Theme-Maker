"use strict";
var _a, _b, _c, _d;
console.log("url.ts, file does not defer");
console.log(window.location);
console.log("");
function getUrlParams() {
    let url = window.location.href;
    let paramsStart = url.indexOf('?') + 1;
    console.log(url[paramsStart]);
    let params = {};
    let nameBuf = "";
    let val = "";
    let eqIndex = 0;
    let storeIn = "nameBuf";
    for (let i = paramsStart; i < url.length; i++) {
        let c = url[i];
        if (url[i] == '=') {
            storeIn = "val";
        }
        else if (url[i] == '&') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            params[nameBuf] = val; // @ts-ignore
            storeIn = "nameBuf";
        }
        else if (storeIn == "nameBuf")
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
(_a = document.querySelector('meta[name="theme-id"]')) === null || _a === void 0 ? void 0 : _a.setAttribute('href', ""); // TODO
(_b = document.querySelector('meta[name="page"]')) === null || _b === void 0 ? void 0 : _b.setAttribute('href', ""); // TODO
(_c = document.querySelector('meta[name="section"]')) === null || _c === void 0 ? void 0 : _c.setAttribute('href', ""); // TODO
(_d = document.querySelector('meta[name="content"]')) === null || _d === void 0 ? void 0 : _d.setAttribute('href', ""); // TODO
//# sourceMappingURL=url.js.map