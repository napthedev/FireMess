const component = {};

let templates = document.getElementsByTagName("template");

for (let i = 0; i < templates.length; i++) {
    component[templates[i].id] = templates[i].innerHTML;
}