<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="<?php
            if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
                $prot = "https://";
            else
                $prot = "http://";
            echo $prot.$_SERVER['HTTP_HOST'];
        ?>">

        <title>${Theme Name} - Discord Theme Maker</title>
        <link rel="icon" href="favicon.ico">
        <link rel="stylesheet" href="style/css/style.css">
        <link rel="stylesheet" href="style/css/discord-main.css">

        <script defer src="script/js/main.js"></script>
        <script defer src="script/js/iconData.js"></script>
        <script defer src="script/js/contentChange.js"></script>
    </head>
    
    <body class="dark">
        <svg style="position: absolute; z-index: -2;">
            <mask id="user-status-mask" width="32" height="32" maskContentUnits="objectBoundingBox">
                <rect x="0"  y="0"  width="100%" height="100%" fill="white"/>
                <circle cx="0.84375" cy="0.84375" r="0.25" fill="black"/>
            </mask>
            <mask id="user-status-small-mask">
                <path d="m31.8865 17.9153c.075-.628.1135-1.2671.1135-1.9153 0-8.83656-7.1634-16-16-16-8.83656 0-16 7.16344-16 16 0 8.8366 7.16344 16 16 16 .6482 0 1.2873-.0385 1.9153-.1135-1.2045-1.6514-1.9153-3.686-1.9153-5.8865 0-5.5228 4.4772-10 10-10 2.2005 0 4.2351.7108 5.8865 1.9153z" fill="#fff"/>
            </mask>
            <mask id="user-status-mobile-mask" width="32" height="32">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="0.59375" y="0.4375" width="0.5" height="0.65625" fill="black" rx="0.13125" ry="0.13125"/>
            </mask>
            <mask id="users-list-item-mask">
                <path d="m22 18.6356c-2.1498 3.2334-5.8261 5.3644-10 5.3644-6.62742 0-12-5.3726-12-12 0-6.62742 5.37258-12 12-12 4.1739 0 7.8502 2.13102 10 5.36441-1.2637 1.90061-2 4.18212-2 6.63559 0 2.4535.7363 4.735 2 6.6356z" fill="#fff"/>
            </mask>
            <mask id="guild-upper-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="28" y="-4" width="24" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-lower-1-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="28" y="28" width="24" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-lower-2-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="22" y="28" width="30" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-lower-3-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="14" y="28" width="38" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-upper-lower-1-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="28" y="-4" width="24" height="24" fill="black" rx="12" ry="12"/>
                <rect x="28" y="28" width="24" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-upper-lower-2-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="28" y="-4" width="24" height="24" fill="black" rx="12" ry="12"/>
                <rect x="22" y="28" width="30" height="24" fill="black" rx="12" ry="12"/>
            </mask>
            <mask id="guild-upper-lower-3-mask" width="48" height="48">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <rect x="28" y="-4" width="24" height="24" fill="black" rx="12" ry="12"/>
                <rect x="14" y="28" width="38" height="24" fill="black" rx="12" ry="12"/>
            </mask>
        </svg>


        <!-- -- TEMPLATES -- -->

        <template id="guild-tmp"> <!-- Class: unread, active -->
            <li class="item">
                <svg class="icon">
                    <foreignObject width="100%" height="100%" mask="url(#)">
                        <div class="wrapper">
                            <img src="res/imgs/sample.png" width="100%" height="100%">
                        </div>
                    </foreignObject>
                </svg>
            </li>
        </template>
        <template id="guild-no-img-tmp"> <!-- Class: unreads, active -->
            <li class="item no-img">
                <svg class="icon">
                    <foreignObject width="100%" height="100%" mask="url(#)">
                        <div class="wrapper">
                            <span class="title">ABC...</span>
                        </div>
                    </foreignObject>
                </svg>
            </li>
        </template>
        <template id="guild-folder-tmp">
            <!-- folder icons div color will always have channel a="0.4" -->
            <li class="item folder"> <!-- class: opened, collapsed -->
                <svg class="icon">
                    <foreignObject width="100%" height="100%" mask="url(#)">
                        <div class="wrapper">
                            <div class="icons">
                                <div class="folder-icon-wrapper">
                                    <svg class="folder-icon" width="24" height="24" viewbox="0 0 24 24">
                                        <path fill="currentColor" icon-data="folder" />
                                    </svg>
                                </div>
                                <div class="icons-wrapper">
                                    <img src="res/imgs/music album.png" alt="g" class="icon">
                                    <img src="res/imgs/dolphin.png" alt="g" class="icon">
                                    <img src="res/imgs/minecraft.png" alt="g" class="icon">
                                    <img src="res/imgs/nether.png" alt="g" class="icon">
                                </div>
                            </div>
                        </div>
                    </foreignObject>
                </svg>
                <ul class="guilds">
                    
                </ul>
            </li>
        </template>

        <template id="private-message-tmp"> <!-- Class: unread, active, muted -->
            <a href="#" class="dm-channel">
                <svg class="avatar" viewbox="0 0 32 32">
                    <foreignObject width="32" height="32" mask="url(#user-status-mask)">
                        <div class="wrapper">
                            <img src="res/imgs/user-1.png">
                        </div>
                    </foreignObject>
                </svg>
                <div class="content">
                    <h2 class="title">Friend Name</h2>
                </div>
                <button class="close">
                    <svg width="16" height="16" viewport="0 0 24 24">
                        <path fill="currentColor" icon-data="x"/>
                    </svg>
                </button>
            </a>
        </template>
        <template id="private-group-tmp"> <!-- Class: unread, active, muted -->
            <a href="#" class="dm-channel">
                <img class="avatar" src="res/imgs/sample.png">
                <div class="content">
                    <h2 class="title">Channel Name</h2>
                    <p class="subtitle">subtitle</p>
                </div>
                <button class="close">
                    <svg width="16" height="16" viewport="0 0 24 24">
                        <path fill="currentColor" icon-data="x"/>
                    </svg>
                </button>
            </a>
        </template>

        <template id="active-now-tmp">
            <h2 class="header">Active Now</h2>
            <li class="item">
                <header>
                    <svg class="avatar" width="32" height="32" viewbox="0 0 32 32">
                        <foreignObject width="100%" height="100%" mask="url(#user-status-mask)">
                            <img src="res/imgs/Madeline.png">
                        </foreignObject>
                    </svg>
                    <div class="name">
                        <h3 class="title">Friend A</h3>
                        <span class="subtitle">Dolphin Emulator ??? 30m</span>
                    </div>
                    <img src="res/imgs/dolphin.png" alt="mc.png" class="header-icon">
                </header>
                <div class="body">
                    <div class="wrapper">
                        <img src="res/imgs/nether.png" alt="nthr.png" class="section-icon">
                        <div class="badge-wrapper">
                            <img src="res/imgs/minecraft.png" alt="mc.png" class="icon-badge">
                        </div>
                    </div>
                    <div class="name">
                        <h3 class="title">Legend of Zelda - The Wind Waker</h3>
                        <p class="subtitle">The Great Sea</p>
                        <p class="time-elapsed">30:41 elapsed</p>
                    </div>
                </div>
            </li>
            <li class="item">
                <header>
                    <svg class="avatar" width="32" height="32" viewbox="0 0 32 32">
                        <foreignObject width="100%" height="100%" mask="url(#user-status-mask)">
                            <img src="res/imgs/Madeline.png">
                        </foreignObject>
                    </svg>
                    <div class="name">
                        <h3 class="title">Friend D and Friend E</h3>
                        <span class="subtitle">In a Voice Chanel</span>
                    </div>
                </header>
                <div class="body">
                    <div class="wrapper server">
                        <img src="res/imgs/sample.png" class="section-icon">
                        <div class="badge-wrapper">
                            <svg width="10" height="10" viewbox="0 0 24 24" class="icon-badge">
                                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" icon-data="voiceChatSmall" />
                            </svg>
                        </div>
                    </div>
                    <div class="name">
                        <a href="#" class="title">Server</a>
                        <a href="#" class="subtitle">Voice Channel</a>
                    </div>
                    <div class="users">
                        <img src="res/imgs/Madeline.png">
                        <img src="res/imgs/Madeline.png">
                    </div>
                </div>
            </li>
            <li class="item">
                <!-- TODO: vc while playing a game -->
                <!-- TODO: vc while live streaming -->
            </li>
            <li class="item spotify">
                <header>
                    <svg class="avatar" width="32" height="32" viewbox="0 0 32 32">
                        <foreignObject width="100%" height="100%" mask="url(#user-status-mask)">
                            <img src="res/imgs/Madeline.png">
                        </foreignObject>
                    </svg>
                    <div class="name">
                        <h3 class="title">Friend B</h3>
                        <span class="subtitle">Listening to Spotify</span>
                    </div>
                    <img src="res/imgs/spotify.png" alt="mc.png" class="header-icon">
                </header>
                <div class="body">
                    <div class="wrapper">
                        <img src="res/imgs/music album.png" alt="nthr.png" class="section-icon">
                    </div>
                    <div class="name">
                        <h3 class="title">Celeste - Scattered and Lost</h3>
                        <p class="subtitle">Lena Raine</p>
                    </div>
                </div>
            </li>
            <li class="item">
                <header>
                    <svg class="avatar" width="32" height="32" viewbox="0 0 32 32">
                        <foreignObject width="100%" height="100%" mask="url(#user-status-mask)">
                            <img src="res/imgs/Madeline.png">
                        </foreignObject>
                    </svg>
                    <div class="name">
                        <h3 class="title">Friend C</h3>
                        <span class="subtitle">Minecraft ??? 2m</span>
                    </div>
                    <img src="res/imgs/minecraft.png" alt="mc.png" class="header-icon">
                </header>
            </li>
            <li class="item empty-card">
                <h3 class="title">It's quiet for now...</h3>
                <p class="subtitle">When a friend starts an activity???like playing a game or hanging out on voice???we???ll show it here!</p>
            </li>
        </template>

        <template id="group-chat-members-tmp">
            <!-- TODO: -->
        </template>

        <template id="server-members-tmp">
            <!-- TODO: -->
        </template>
        
        
        <!-- TEMPLATES END -->
        
        <!-- * this page will be redirected from /theme with parameter ?t = where the theme data is found in the database -->

        <!-- ! Do not use the slash model -->
        <!-- URL ADDRESSES
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
        -->
        <!-- URL ADDRESSES
            home/
            ::these will support browser back button ==> window.history.pushState({}, document.title, "/" + "my-new-url.html");

            /channels ==> is discord-main.html
                ?sec=dms
                    &content=friends
                    &content=stage-discovery
                    &content=nitro
                    &content=${private-chat-name}
                ?sec=${server-name}

            /settings ==> is discord-settings.html
        -->


        <section id="top-bar">
            <svg class="logo" width="55" height="16" viewbox="0 0 55 16">
                <path fill="currentColor" icon-data="discordWord" />
            </svg>
            <button class="close-app">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <polygon fill="currentColor" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1" />
                </svg>
            </button>
            <button class="min-max">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" fill="none" />
                </svg>
            </button>
            <button class="save">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="1" y="6" width="10" height="1" fill="currentColor" />
                </svg>
            </button>
        </section>


        <div id="main-wrapper">
            <nav id="guilds" class=""> <!-- class="new-above, new-below" -->
                <div class="scroller">
                    <li class="item" id="home-btn">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg">
                            <foreignObject width="100%" height="100%" mask="url(#guild-lower-1-mask)">
                                <div class="wrapper">
                                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewbox="0 0 28 20">
                                        <path fill="currentColor" icon-data="discord"/>
                                    </svg>
                                </div>
                            </foreignObject>
                        </svg>
                        <span class="badge lower ping">1</span>
                    </li>
        
                    <section id="dms-ping"> <!-- private-unreads -->
                        <!-- ? HERE IS THE UNREAD DMS -->
                    </section>
                    <hr>
                    <section id="servers">
                        <!-- ? HERE IS ALL THE SERVERS -->
                    </section>

                    <li class="item guild-actions" id="add-server">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" icon-data="plus"></path>
                        </svg>
                    </li>
                    <li class="item guild-actions" id="explore">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" icon-data="compass"></path>
                        </svg>
                    </li>
                </div>
            </nav>
    
            <div id="app-base" class="dms show-notice"> <!-- dms, server, explore, show-notice -->
                <div id="notice" class="">
                    <button class="close"></button>
                    THIS IS A NOTICE
                </div>
                <div class="base-wrapper">
                    <nav id="sidebar">
                        <div class="head">
                            <!-- ? variable -->
                            <button id="search-dms" class="search-bar">Find or start a conversation</button>
                        </div>
                        <div class="channels" conent="private-msgs"> <!-- content: private-msgs, server-channels, public-servers -->
                            <div class="scroller">
                                <!-- ? variable -->
                                <a href="channels/friends" class="dm-channel active" id="friends">
                                    <div class="wrapper avatar">
                                        <svg width="24" height="24" viewport="0 0 24 24">
                                            <path fill="currentColor" fill-rule="nonzero" icon-data="friend" transform="translate(2 4)"></path>
                                            <path fill-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <h2 class="title">Friends</h2>
                                    <div class="badge">1</div>
                                </a>
                                <a href="channels/stage-discovery" class="dm-channel" id="stage-discovery">
                                    <div class="wrapper avatar">
                                        <svg width="24" height="24" viewport="0 0 24 24">
                                            <path fill="currentColor" icon-data="stage"></path>
                                        </svg>
                                    </div>
                                    <span class="title">Stage Discovery</span>
                                </a>
                                <a href="channels/nitro" class="dm-channel" id="nitro">
                                    <div class="wrapper avatar">
                                        <svg width="24" height="24" viewport="0 0 24 24">
                                            <path fill="currentColor" icon-data="nitro"></path>
                                        </svg>
                                    </div>
                                    <span class="title">Nitro</span>
                                </a>
    
                                <h2 class="category">
                                    <span>DIRECT MESSAGES</span>
                                    <button class="add">
                                        <svg x="0" y="0" width="16" height="16" viewport="0 0 18 18">
                                            <polygon fill-rule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                                        </svg>
                                    </button>
                                </h2>
    
                                <div id="private-chats">
                                    <!-- ? Private Chats -->
                                </div>
                            </div>
                        </div>
                        <div class="media-control"> <!-- class: in-vc-->
                            <div class="vc-control">
                                <div class="connection">
                                    <div class="text">
                                        <h3 class="status connected">
                                            <svg width="16" height="16" viewbox="0 0 24 24">
                                                <path fill="currentColor" icon-data="connection"/>
                                            </svg>
                                            <span class="name">Voice Connected</span>
                                        </h3>
                                        <a class="subtitle">${Voice-Channel_Name} / ${Server_Name}</a>
                                    </div>
                                    <button class="disconnect">
                                        <svg width="20" height="20" viewbox="0 0 24 24">
                                            <path fill="currentColor" icon-data="callEnd"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="actions">
                                    <button class="video" onclick="openVideo()">
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" icon-data="videoCall"></path>
                                        </svg>
                                        <span>Video</span>
                                    </button>
                                    <button class="stream" onclick="startStream()">
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" icon-data="startStream"></path>
                                        </svg>
                                        <span>Screen</span>
                                    </button>
                                </div>
                            </div>
    
                            <div class="content">
                                <svg class="avatar" viewbox="0 0 32 32">
                                    <foreignObject width="32" height="32" mask="url(#user-status-mask)">
                                        <div class="wrapper">
                                            <img src="res/imgs/user-1.png">
                                        </div>
                                    </foreignObject>
                                </svg>
                                <div class="name">
                                    <h3 class="title">MyUser</h3>
                                    <p class="subtitle">
                                        <span class="desc">Description</span>
                                        <span class="tag">#1234</span>
                                    </p>
                                </div>
                                <div class="control">
                                    <button id="mute-btn" class="mic unmuted" onclick="toggleMute()">
                                        <svg width="20" height="20" viewbox="0 0 24 24">
                                            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" icon-data="microphone.unmuted.0"></path>
                                            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" icon-data="microphone.unmuted.1"></path>
                                        </svg>
                                    </button>
                                    <button id="deaf-btn" class="audio undeafened" onclick="toggleDeafen()">
                                        <svg width="20" height="20" viewbox="0 0 24 24">
                                            <path fill="currentColor" icon-data="deaf.inactive"></path>
                                        </svg>
                                    </button>
                                    <button id="settings-btn" onclick="openSettings()">
                                        <svg width="20" height="20" viewbox="0 0 24 24">
                                            <path fill="currentColor" icon-data="settings"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
        
                    <section id="main-content" content="friends"> <!-- content: friends, stage-discovery, nitro -->
                        <section class="head">
                            <div class="info">
                                <h3 class="header">
                                    <svg class="section-icon" x="0" y="0" width="24" height="24" viewbox="0 0 24 24">
                                        <path fill="currentColor" icon-data="friend" transform="translate(2 4)"></path>
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
                            </div>
                            <div class="tools">
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
                            </div>
                        </section>
                        <section class="content"> <!-- TODO: Content property? -->
                            <main class="chat">
                                <div class="tab active" name="online">
                                    <div class="scroller">
                                        <h2 class="header">Online ??? 12</h2>
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
                                        <h2 class="header">Pending ??? 2</h2>
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
                                        <h2 class="header">Blocked ??? 1</h2>
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
                                            <p class="subtitle">Wumpus is waiting on friends. You don???t have to though!</p>
                                        </div>
                                    </div>
                                </div>
                            </main>
            
                            <section class="sidebar" content="active-now"> <!-- content: active-now, members-->
                                <div class="scroller empty"> <!-- class: empty-->
                                    <!-- ! TEMPLATE -->

                                </div>
                            </section>
                        </section>
                    </section>
                </div>
                
            </div>
        </div>
    </body>
</html>