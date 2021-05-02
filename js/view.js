const view = {};
let current_view = "";

view.setActiveScreen = function (screenName) {
    if (current_view == "") {
        switch_screen(screenName);
    } else {
        document.getElementById("loading").classList.add("load-animation");
        setTimeout(() => {
            switch_screen(screenName);
        }, 1000);
    }
}

function switch_screen(screenName) {
    current_view = screenName;
    switch (screenName) {
        case "chatScreen":
            document.getElementById("app").innerHTML = conponent.chatScreen;
            init_chat();
            break;

        case "registerScreen":
            document.getElementById("app").innerHTML = conponent.registerScreen;
            registerSubmit();
            break;

        case "signinScreen":
            document.getElementById("app").innerHTML = conponent.signinScreen;
            signinSubmit();
            break;

        case "welcomeScreen":
            document.getElementById("app").innerHTML = conponent.welcomeScreen;
            init_landing();
            break;

        default:
            break;
    }
}