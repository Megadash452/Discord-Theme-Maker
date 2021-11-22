"use strict";
var _a, _b, _c, _d;
console.log("url.ts, script does not defer");
function getUrlParams() {
    let url = window.location.href;
    let paramsStart = url.indexOf('?') + 1;
    let params = {};
    let pair = {
        nameBuf: "",
        val: ""
    };
    let storeIn = "nameBuf";
    for (let i = paramsStart; i < url.length; i++) {
        let c = url[i];
        if (url[i] == '=')
            storeIn = "val";
        else if (url[i] == '&') {
            params[pair.nameBuf] = pair.val;
            pair.nameBuf = "";
            pair.val = "";
            storeIn = "nameBuf";
        }
        else if (storeIn == "nameBuf")
            pair.nameBuf += url[i];
        else if (storeIn == "val")
            pair.val += url[i];
    }
    params[pair.nameBuf] = pair.val;
    return params;
}
var urlParams = getUrlParams();
// document.querySelector("base")?.setAttribute('href', window.location.origin);
(_a = document.querySelector('meta[name="theme-id"]')) === null || _a === void 0 ? void 0 : _a.setAttribute('content', urlParams.id);
(_b = document.querySelector('meta[name="page"]')) === null || _b === void 0 ? void 0 : _b.setAttribute('content', urlParams.page);
(_c = document.querySelector('meta[name="section"]')) === null || _c === void 0 ? void 0 : _c.setAttribute('content', urlParams.sec);
(_d = document.querySelector('meta[name="content"]')) === null || _d === void 0 ? void 0 : _d.setAttribute('content', urlParams.content);
//# sourceMappingURL=url.js.map