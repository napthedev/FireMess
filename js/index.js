let auth, database;

const init = function () {
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  database = firebase.database();

  auth.onAuthStateChanged(function (user) {
    if ((user && user.emailVerified) || (user && user.providerData[0].providerId === "facebook.com")) {
      database
        .ref("users")
        .child(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.exists()) {
            database.ref("users").child(auth.currentUser.uid).set({
              displayName: auth.currentUser.displayName,
              email: auth.currentUser.email,
              photoURL: auth.currentUser.photoURL,
            });
          }
        });
      view.setActiveScreen("chatScreen");
    } else if (user && !user.emailVerified) {
      document.getElementById("openEmailModal").click();
    } else if (view.current != "signInScreen" && view.current != "registerScreen") {
      view.setActiveScreen("welcomeScreen");
    }
  });
};

document.addEventListener("animationend", function (event) {
  if (event.animationName === "zoom-in") {
    event.target.classList.remove("zoom-in");
  } else if (event.animationName === "load") {
    event.target.classList.remove("load-animation");
  }
});

document.getElementById("emailVerificationModal").addEventListener("hidden.bs.modal", function () {
  auth.signOut();
  view.setActiveScreen("signInScreen");
});

window.onload = init;
