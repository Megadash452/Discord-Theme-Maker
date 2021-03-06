<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="<?php
            if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
                $prot = "https://";
            else
                $prot = "http://";
            echo $prot.$_SERVER['HTTP_HOST'];
        ?>">

        <title>Theme Editor</title>
        <link rel="stylesheet" href="style/css/style.css">
        <link rel="stylesheet" href="style/css/editor-list.css">

        <script defer src="script/js/ui.js"></script>
    </head>

    <body class="theme-editor">
        <nav id="navbar">
            <div class="header">
                <a href="index.html" id="back-btn">
                    <img src="res/imgs/back.svg">
                </a>
                <div class="title">
                    <h1>Discord Theme Maker</h1>
                </div>
                
            </div>
            <div class="info">
                <a id="themes-btn" class="active" data-tooltip="Theme Editor">
                    <img src="res/imgs/brush.svg" width="24px" height="24px">
                </a>
                <button id="account-btn" data-tooltip="Account">
                    <img src="res/imgs/account.svg" width="24px" height="24px">
                </button>
                <button id="menu-btn" data-tooltip="Menu" onclick="toggleSidebar()">
                    <img src="res/imgs/menu.svg" width="32px" height="32px">
                </button>

                <section id="menu-side-bar">
                    <ul class="settings">
                        <h1>View Options</h1>
                        <li>
                            Theme editor will show in <!-- TODO: Word this one better -->
                            <div class="device-view">
                                <span class="radio">
                                    <input type="radio" name="device-view" value="windows" checked>
                                    <label for="windows">Windows</label>
                                </span>
                                <br>
                                <span class="radio">
                                    <input type="radio" name="device-view" value="linux">
                                    <label for="linux">Linux</label>
                                </span>
                                <br>
                                <span class="radio">
                                    <input type="radio" name="device-view" value="mac">
                                    <label for="mac">Mac</label>
                                </span>
                                <span class="radio">
                                    <input type="radio" name="device-view" value="web">
                                    <label for="web">Web</label>
                                </span>
                            </div>
                        </li>
                        <li>
                            Page is in <span class="switch">
                                <span class="first">Light</span>
                                <input type="checkbox" class="switch" id="theme-switch">
                                <span class="second">Dark</span>
                            </span> mode
                        </li>
                        <li>
                            View your themes in <span class="switch">
                                <span class="first">Grid</span>
                                <input type="checkbox" class="switch">
                                <span class="second">List</span>
                            </span>
                        </li>
                    </ul>

                    <hr>
                </section>

                <div id="page-filter" onclick="collapseSidebar()"></div>
            </div>
        </nav>

        <div id="main-content">
            <section id="theme-list">
                <!-- this section is dynamic with js -->
                <!-- TODO: Themes have id -->
                <div class="rows">
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <!-- TODO: Color Palette Section -->
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>
                    <button class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/sample.png"
                                 alt="theme background"
                                 class="theme-bg">
                        </div>
                        <div class="info">
                            <h3 class="title">Heart of the Mountain</h3>
                        </div>
                    </button>

                    <button id="new-theme" class="theme-item">
                        <div class="img-wrapper">
                            <img src="res/imgs/add.svg">
                        </div>
                        <div class="info">
                            <h3 class="title">New Theme</h3>
                        </div>
                    </button>

                    <a href="theme/channels">FOR DEV - DISCORD PAGE</a>
                </div>
            </section>
        </div>
    </body>
</html>