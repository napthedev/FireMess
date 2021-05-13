const model = {};

model.register = (data) => {
  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      auth.currentUser.updateProfile({
        displayName: data.firstName + " " + data.lastName,
        email: data.email,
        photoURL: "https://i.imgur.com/CDqQHpR.jpg",
      });

      auth.currentUser.sendEmailVerification();
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

model.signin = (data) => {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      alert(err.message);
    });
};

model.signout = () => {
  auth.signOut().catch((err) => {
    console.log(err);
  });
};

model.resendEmail = () => {
  auth.currentUser.sendEmailVerification().catch((err) => {
    console.log(err);
    alert(err.message);
  });
};

model.signinWithGoogle = () => {
  let googleProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
model.signinWithFacebook = () => {
  let facebookProvider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(facebookProvider)
    .then((result) => {
      console.log(result);
      auth.currentUser.updateProfile({
        photoURL: result["additionalUserInfo"]["profile"]["picture"]["data"]["url"],
      });
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
