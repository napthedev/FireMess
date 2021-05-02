function landing_scroll() {
    let fade_el = [];
    fade_el = Array.prototype.concat.apply(fade_el, document.getElementsByClassName("fade-left"));
    fade_el = Array.prototype.concat.apply(fade_el, document.getElementsByClassName("fade-right"));
    for (let i = 0; i < fade_el.length; i++) {
        if (fade_el[i].getBoundingClientRect().top < innerHeight && fade_el[i].getBoundingClientRect().top + innerHeight / 2 > 0) {
            fade_el[i].classList.add("fade-focus");
        } else {
            fade_el[i].classList.remove("fade-focus");
        }
    }
}

function init_landing() {
    landing_scroll();
    document.querySelector(".landing-page").addEventListener("scroll", landing_scroll);
}