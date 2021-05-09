const conponent = {};

let templates = document.getElementsByTagName("template");

for (let i = 0; i < templates.length; i++) {
    conponent[templates[i].id] = templates[i].innerHTML;
}