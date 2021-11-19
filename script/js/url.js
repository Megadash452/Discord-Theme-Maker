"use strict";
var _a, _b, _c, _d, _e;
console.log("url.ts, file does not defer");
console.log(window.location.href);
(_a = document.querySelector("base")) === null || _a === void 0 ? void 0 : _a.setAttribute('href', window.location.origin);
(_b = document.querySelector('meta[name="theme-id"]')) === null || _b === void 0 ? void 0 : _b.setAttribute('href'); // TODO
(_c = document.querySelector('meta[name="page"]')) === null || _c === void 0 ? void 0 : _c.setAttribute('href'); // TODO
(_d = document.querySelector('meta[name="section"]')) === null || _d === void 0 ? void 0 : _d.setAttribute('href'); // TODO
(_e = document.querySelector('meta[name="content"]')) === null || _e === void 0 ? void 0 : _e.setAttribute('href'); // TODO
//# sourceMappingURL=url.js.map