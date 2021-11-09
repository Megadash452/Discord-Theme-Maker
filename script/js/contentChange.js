"use strict";
// --- When click guild, dm contents, dm chats
let mainContent = document.getElementById("main-content");
let head = mainContent.querySelector(".head");
let main = mainContent.querySelector("main");
let sidebar = mainContent.querySelector(".sidebar");
// FRIENDS BUTTON
document.getElementById("friends").addEventListener('click', e => {
    var _a;
    e.preventDefault();
    if (document.getElementById("friends").classList.contains("active"))
        return;
    // TODO: window.history.pushState({}, document.title, window.location + "/friends");
    head.querySelector(".info").innerHTML = `
        <h3 class="header">
            <svg class="section-icon" x="0" y="0" width="24" height="24" viewbox="0 0 24 24">
                <path fill="currentColor" icon-data="friend" transform="translate(2 4)""></path>
            </svg>
            Friends
        </h3>
        <hr class="vertical">
        <nav class="tab-btns" target="#main-content .content">
            <button class="active" target="online">Online</button>
            <button target="all">All</button>
            <button target="pending">Pending<span class="badge">1</span></button>
            <button target="blocked">Blocked</button>
            <button id="add-friend-btn" target="add-friend">Add Friend</button>
        </nav>
    `;
    head.querySelector(".tools").innerHTML = `
        <button id="new-group-btn">
            <svg width="24" height="24" viewbox="0 0 24 24">
                <path fill="currentColor" icon-data="messageAdd"></path>
            </svg>
        </button>
        <hr class="vertical">
        <button onclick="showInbox()" data-tooltip="Inbox">
            <svg width="24" height="24" viewbox="0 0 24 24">
                <path fill="currentColor" icon-data="inbox"></path>
            </svg>
        </button>
        <button>
            <svg width="24" height="24" viewbox="0 0 24 24">
                <path fill="currentColor" icon-data="help"></path>
            </svg>
        </button>
    `;
    main.innerHTML = `
        <div class="tab active" name="online">
            <div class="scroller">
                <h2 class="header">Online — 12</h2>
                <li class="item">
                    <div class="user-info">
                        <svg class="avatar" width="32" height="32">
                            <foreignObject width="100%" height="100%" mask="url(#user-status-mask)">
                                <img src="res/imgs/Madeline.png">
                            </foreignObject>
                            <!-- TODO: user status badge -->
                        </svg>
                        <div class="name">
                            <h3 class="title">
                                <span class="username">Friend A</span>
                                <span class="tag">#0001</span>
                            </h3>
                            <span class="subtitle">Online</span>
                        </div>
                    </div>
                    <div class="actions">
                        <button data-tooltip="Message" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor" icon-data="message"></path>
                            </svg>
                        </button>
                        <button data-tooltip="More" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor" icon-data="options"></path>
                            </svg>
                        </button>
                    </div>
                </li>
                <div class="scroller empty">
                    <div class="wrapper">
                        <img src="res/imgs/empty-online.svg">
                        <p class="subtitle">No one's around to play with Wumpus.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab" name="all">
            <div class="scroller">
                <!-- TODO: hardcode friend list -->
                <li class="item">
                    
                </li>
                
                <div class="scroller empty">
                    <div class="wrapper">
                        <img src="res/imgs/empty-friends.svg">
                        <p class="subtitle">No one's around to play with Wumpus.</p>
                        <button>Add Friend</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab" name="pending">
            <div class="scroller">
                <h2 class="header">Pending — 2</h2>
                <li class="item">
                    <div class="user-info">
                        <svg class="avatar" width="32" height="32">
                            <foreignObject width="100%" height="100%" mask="url(#)">
                                <img src="res/imgs/Madeline.png">
                            </foreignObject>
                        </svg>
                        <div class="name">
                            <h3 class="title">
                                <span class="username">Friend A</span>
                                <span class="tag">#0001</span>
                            </h3>
                            <span class="subtitle">Incoming Friend Request</span>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="accept" data-tooltip="Accept" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor" icon-data="checkMark" />
                            </svg>
                        </button>
                        <button class="reject" data-tooltip="Ignore" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor" icon-data="x" />
                            </svg>
                        </button>
                    </div>
                </li>
                <li class="item">
                    <div class="user-info">
                        <svg class="avatar" width="32" height="32">
                            <foreignObject width="100%" height="100%" mask="url(#)">
                                <img src="res/imgs/Madeline.png">
                            </foreignObject>
                        </svg>
                        <div class="name">
                            <h3 class="title">
                                <span class="username">Friend B</span>
                                <span class="tag">#0001</span>
                            </h3>
                            <span class="subtitle">Outgoing Friend Request</span>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="reject" data-tooltip="Cancel" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor"icon-data="x" />
                            </svg>
                        </button>
                    </div>
                </li>
                <div class="scroller empty">
                    <div class="wrapper">
                        <img src="res/imgs/empty-pending.svg">
                        <p class="subtitle">There are no pending friend requests. Here's Wumpus for now.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab" name="blocked">
            <div class="scroller">
                <h2 class="header">Blocked — 1</h2>
                <li class="item">
                    <div class="user-info">
                        <svg class="avatar" width="32" height="32">
                            <foreignObject width="100%" height="100%" mask="url(#)">
                                <img src="res/imgs/Madeline.png">
                            </foreignObject>
                        </svg>
                        <div class="name">
                            <h3 class="title">
                                <span class="username">Friend B</span>
                                <span class="tag">#0001</span>
                            </h3>
                            <span class="subtitle">Blocked</span>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="reject" data-tooltip="Unblock" tooltip-direction="up">
                            <svg width="20" height="20" viewbox="0 0 24 24">
                                <path fill="currentColor" icon-data="unblock" />
                            </svg>
                        </button>
                    </div>
                </li>
                <div class="scroller empty">
                    <div class="wrapper">
                        <img src="res/imgs/empty-blocked.svg">
                        <p class="subtitle">You can't unblock the Wumpus.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab" name="add-friend">
            <header>
                <h2 class="title">Add Friend</h2>
                <p class="subtitle">You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
                <form autocomplete="off" class="wrapper"> <!-- :focus-within, class: success -->
                    <input id="new-friend-search-bar" type="text" placeholder="Enter a Username#0000" maxlength="37">
                    <div class="input-overlay"></div>
                    <button type="submit" disabled>Send Friend Request</button>
                </form>
                <p class="subtitle message error hidden"></p> <!-- class: hidden, error, success -->
            </header>
            <div class="scroller empty">
                <div class="wrapper">
                    <img src="res/imgs/empty-friends.svg">
                    <p class="subtitle">Wumpus is waiting on friends. You don’t have to though!</p>
                </div>
            </div>
        </div>
    `;
    activeBtnRelation(head.querySelector(".tab-btns"));
    linkToTabs(head.querySelector(".tab-btns"));
    sidebar.setAttribute("content", "active-now");
    sidebar.classList.remove("hidden");
    sidebar.querySelector(".scroller").innerHTML = "";
    appendTemplateElement(document.querySelector("#active-now-tmp"), sidebar.querySelector(".scroller"));
    (_a = mainContent.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
});
// STAGE DISCOVERY BUTTON
// TODO:
// NITRO BUTTON
document.getElementById("nitro").addEventListener('click', e => {
    var _a;
    e.preventDefault();
    if (document.getElementById("nitro").classList.contains("active"))
        return;
    head.querySelector(".info").innerHTML = `
        <h3 class="header">
            <svg class="section-icon" x="0" y="0" width="24" height="24" viewbox="0 0 24 24">
                <path fill="currentColor" icon-data="nitro""></path>
            </svg>
            Nitro
        </h3>
    `;
    head.querySelector(".tools").innerHTML = "";
    main.innerHTML = ""; // TODO:
    sidebar.classList.add("hidden");
    (_a = mainContent.querySelectorAll("path[icon-data]")) === null || _a === void 0 ? void 0 : _a.forEach(assignIconData);
});
//# sourceMappingURL=contentChange.js.map