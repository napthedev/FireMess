function landing_scroll() {
  check_scroll("background-1");
  check_scroll("background-2");
  check_scroll("background-3");
}

function check_scroll(el) {
  let background = document.getElementById(el);
  if (background.getBoundingClientRect().top < innerHeight && background.getBoundingClientRect().top + innerHeight / 2 > 0) {
    background.classList.add(el + "-focus");
  } else {
    background.classList.remove(el + "-focus");
  }
}

function init_landing() {
  landing_scroll();
  document.querySelector(".landing-page").addEventListener("scroll", landing_scroll);
}
