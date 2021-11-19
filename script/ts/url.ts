console.log("url.ts, file does not defer");
console.log(window.location.href);


document.querySelector("base")?.setAttribute('href', window.location.origin);
document.querySelector('meta[name="theme-id"]')?.setAttribute('href', ); // TODO
document.querySelector('meta[name="page"]')?.setAttribute('href', ); // TODO
document.querySelector('meta[name="section"]')?.setAttribute('href', ); // TODO
document.querySelector('meta[name="content"]')?.setAttribute('href', ); // TODO