let auth, database;

const init = function () {
    var firebaseConfig = {
        apiKey: "AIzaSyC0YRgwb33eKMgCH4uE1ChOt9NjzNcpn24",
        authDomain: "firemess-2ccd2.firebaseapp.com",
        projectId: "firemess-2ccd2",
        storageBucket: "firemess-2ccd2.appspot.com",
        messagingSenderId: "198328051551",
        appId: "1:198328051551:web:d39551bf699163a115b8ea"
    };
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    database = firebase.database();

    auth.onAuthStateChanged(function (user) {
        if (user && user.emailVerified) {
            database.ref("users").child(auth.currentUser.uid).get().then(snapshot => {
                if (!snapshot.exists()){
                    database.ref("users").child(auth.currentUser.uid).set({
                        displayName: auth.currentUser.displayName,
                        email: auth.currentUser.email,
                        photoURL: "https://i.imgur.com/VXLM9xv.png",
                    });
                }
            });
            view.setActiveScreen("chatScreen");
        } else if (user && !user.emailVerified) {
            document.getElementById("openEmailModal").click();
        } else if (current_view != "signinScreen" && current_view != "registerScreen") {
            view.setActiveScreen("welcomeScreen");
        }
    });
};

const to_signin = function () {
    view.setActiveScreen("signinScreen");
}

const to_register = function () {
    view.setActiveScreen("registerScreen");
}

document.addEventListener("animationend", function (event) {
    if (event.animationName == "pop-in") {
        event.target.classList.remove("animate");
    } else if (event.animationName == "load"){
        event.target.classList.remove("load-animation")
    }
});

document.getElementById("emailVerificationModal").addEventListener("hidden.bs.modal", function(){
    auth.signOut();
    to_signin();
});

window.onload = init;