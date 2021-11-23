console.log("url.ts, script does not defer");

// type ParamsObj = {
//     [index: string]: string | (() => string)
// };

interface ParamsObj {
    [index: string]: string | (() => string),
    readonly str: (() => string)
}

function parseUrlParams(url: string = window.location.search): ParamsObj {
    let paramsStart = url.indexOf('?')
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
    window.history.replaceState(null, document.title, url);
}
function pushUrl(url: string) {
    window.history.pushState(null, document.title, url);
}


function setLocation(url: string) {
    let params = parseUrlParams(url);
    let base = url.split('?')[0];

    switch (params.id) { // TODO: get from database instead
    case "sample":
        window.location.assign("themes/channels"); // ! TODO: replace acts like .href= (creates new history entry and write to the url)
        setUrl(url);
        break;
    }
}



function setPageContent(params?: string) {
    // the params parameter would append instead of overwrite the url Parameters
    let urlParams = parseUrlParams();
    if (params) Object.assign(urlParams, parseUrlParams(params));


    if (!urlParams.id) {
        console.log("// TODO: show themes list to choose");
    } else {
        // TODO: show discord page with theme applied
        
        if (!urlParams.page) {
            urlParams.page = "channels";
        } else {
            // TODO: show page
        }
        if (!urlParams.section) {
            switch (urlParams.page) {
            case "channels":
                urlParams.section = "dms";
                break;
            case "settings":
                urlParams.section = "user-settings";
                break;
            }
        } else {
            // TODO: show section
        }
        if (!urlParams.content) {
            switch (urlParams.section) {
            case "dms":
                urlParams.content = "friends";
                break;
            case "user-settings":
                urlParams.content = "my-account";
                break;
            default:
                if (urlParams.page == "settings")
                    urlParams.content = "overview";
                else
                    urlParams.content = "welcome";
            }
        } else {
            // content for freinds, stage-discovery, and nitro are handled below this function
            // TODO: show content
        }
    }
    
    setUrl("themes/?" + urlParams.str());
} setPageContent();


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