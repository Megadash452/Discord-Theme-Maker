console.log("url.ts, script does not defer");

// type ParamsObj = {
//     [index: string]: string | (() => string)
// };

interface ParamsObj {
    [index: string]: string | (() => string),
    readonly str: (() => string)
}

function parseUrlParams(url: string = window.location.search): ParamsObj {
    let paramsStart = url.indexOf('?');
    let params: ParamsObj = {
        str: toStr
    };
    // let meta: ParamsObj = {};

    if (paramsStart < 0)
        return params;
        // paramsStart = 0; // TODO: make sure this doesnt break the page
        // TODO: allow the absense of a '?' without returning an empty string
    else
        paramsStart++; // add 1 to skip the '?'


    let pair = {
        nameBuf: "",
        val: ""
    };
    let storeIn = "nameBuf";

    for (let i = paramsStart; i < url.length; i++)
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
    
    params[pair.nameBuf] = pair.val;
    function toStr(): string {
        return paramsToStr(params);
    }
    return params;
}
var getUrlParams = parseUrlParams;

function paramsToStr(params: ParamsObj, addQuestionAtStart: boolean = false): string {
    let str = "";

    for (let param in params)
        if (typeof(params[param]) == 'string')
            str += `${param}=${params[param]}&`;
    
    str = str.slice(0, -1); // remove the last &
    
    if (addQuestionAtStart)
        return '?' + str;
    else
        return str;
}

function setUrl(url: string) {
    window.history.replaceState({}, document.title, url);
}
function pushUrl(url: string) {
    window.history.pushState({}, document.title, url);
}

function setLocation(url: string, set: boolean = true) {
    let base = url.split('?')[0];
    let urlParams = parseUrlParams(url);

    let paramPage = parseUrlParams(url).page;
    let metaPage = document.querySelector(`meta[name="file"]`)?.getAttribute("content") as string;

    // switch (parseUrlParams(url).id) { // TODO: get from database instead
    // case "sample":
    //     window.location.assign(`themes/channels?${params}`);
    //     // function always exits after location change
    // }

    if (paramPage == "channels" && metaPage != "channels")
        window.location.assign(`themes/channels?${urlParams.str()}`);
    else if (paramPage == "settings" && metaPage != "settings")
        window.location.assign(`themes/settings?${urlParams.str()}`);

    // ! might make it all be in one discord page, and settigns will be in an iframe
}
function pushLocation(url: string) {
    setLocation(url, false)
}



function setPageContent(params?: string, set: boolean = true) {
    // @param set
    //      if true (default) use setUrl()
    //      if false use pushUrl()

    // the params parameter would append instead of overwrite the url Parameters
    let urlParams = parseUrlParams();
    if (params) Object.assign(urlParams, parseUrlParams(params));

    // if no params.id just stay on the current /themes/ page
    if (urlParams.id) {
        if (urlParams.page == "settings") {
            /*if (urlParams.sec)*/ { // TODO: default (else), when all are applied remove. Get every server and see if section == to a server filename (forEach())
                urlParams.sec = "user-settings";
                if (!urlParams.content)
                    urlParams.content = "my-account";
                // TODO: get all settings names and see if content == to one of them (forEach())
            }
            // * GOTO settings
        } else { // urlParams.page == "channels"
            urlParams.page = "channels";

            /*if (urlParams.sec)*/ { // TODO: default (else), when all are applied remove. Get every server and see if section == to a server filename (forEach())
                urlParams.sec = "dms";

                switch (urlParams.content) {
                case "stage-discovery":
                    // TODO
                    break;
                case "nitro":
                    // TODO
                    break;
                /* // TODO: get every dm/group chat and see if content == to a dm/group chat filename (forEach())
                
                */
                default /*friends*/:
                    urlParams.content = "friends";
                }
            }
            // * GOTO channels
        }
    }

    pushLocation("themes/?" + urlParams.str());
    setUrl("themes/?" + urlParams.str());
} setPageContent();



function setParams(params: {[index: string]: string}) {
    let urlParams = getUrlParams();
    for (let param in params)
        urlParams[param] = params[param];

    setUrl("themes/?" + urlParams.str());
}
function pushParams(params: {[index: string]: string}) {
    let urlParams = getUrlParams();
    for (let param in params)
        urlParams[param] = params[param];

    pushUrl("themes/?" + urlParams.str());
}


/*

<!-- * this page will be redirected from /theme with parameter ?t = where the theme data is found in the database -->


! Do not use the slash model
URL ADDRESSES
    home/
    ::these will support browser back button ==> window.history.pushState({}, document.title, "/" + "my-new-url.html");

    /channels ==> is discord-main.html
        /channels/dms
            /channels/dms/friends
            /channels/dms/stage-discovery
            /channels/dms/nitro
            /channels/dms/${private-chat-name}
        /channels/${server-name}

    /settings ==> is discord-settings.html

URL ADDRESSES
    home/
    ::these will support browser back button ==> window.history.pushState({}, document.title, "/" + "my-new-url.html");
    
    /themes
        ?id=123456789                id=sample
        ?    &page=channels          ==> default (necessary)
        ?       &sec=dms             ==> default
                    &content=friends
                    &content=stage-discovery
                    &content=nitro
                    &content=${private-chat-name}
        ?       &sec=${server-name}
                    &content=${channel-name}
        ?    &page=settings
        ?       &sec=user-settings   ==> default
                    &content=my-account
                    &content=user-profile
                    &content={ ... }
        ?       &sec=${server-name}
                    &content=overview
                    &content=roles
                    &content={ ... }

        may use firebase to store theme data


    scrapped:
        /channels ==> is discord-main.html
            ?sec=dms
                &content=friends
                &content=stage-discovery
                &content=nitro
                &content=${private-chat-name}
            ?sec=${server-name}

        /settings ==> is discord-settings.html
*/

// var urlParams = parseUrlParams();

// document.querySelector("base")?.setAttribute('href', window.location.origin);
// document.querySelector('meta[name="theme-id"]') ?. setAttribute('content', urlParams.id      as string);
// document.querySelector('meta[name="page"]')     ?. setAttribute('content', urlParams.page    as string);
// document.querySelector('meta[name="section"]')  ?. setAttribute('content', urlParams.sec     as string);
// document.querySelector('meta[name="content"]')  ?. setAttribute('content', urlParams.content as string);