console.log("url.ts, script does not defer");

function getUrlParams() {
    let url = window.location.href;
    let paramsStart = url.indexOf('?') + 1;
    let params: {[index: string]: string} = {};

    let pair = {
        nameBuf: "",
        val: ""
    };
    let storeIn = "nameBuf";

    for (let i = paramsStart; i< url.length; i++) {
        let c = url[i];

        if (url[i] == '=')
            storeIn = "val";
        else if (url[i] == '&') {
            params[pair.nameBuf] = pair.val;
            pair.nameBuf = "";
            pair.val = "";
            storeIn = "nameBuf";
        } else
            if (storeIn == "nameBuf")
                pair.nameBuf += url[i];
            else if (storeIn == "val")
                pair.val += url[i];
    }
    
    params[pair.nameBuf] = pair.val;
    return params;
}
var urlParams = getUrlParams();

// document.querySelector("base")?.setAttribute('href', window.location.origin);
document.querySelector('meta[name="theme-id"]')?.setAttribute('content', urlParams.id);
document.querySelector('meta[name="page"]')?.setAttribute('content', urlParams.page);
document.querySelector('meta[name="section"]')?.setAttribute('content', urlParams.sec);
document.querySelector('meta[name="content"]')?.setAttribute('content', urlParams.content);