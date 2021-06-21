const model = {};
const avatar_placeholder_color = [
  { background: "0D8ABC", color: "FFFFFF" },
  { background: "B8E986", color: "4A7D0E" },
  { background: "CEF2EF", color: "259A8F" },
  { background: "F8F8F8", color: "29353A" },
  { background: "263238", color: "ADB2B4" },
];

model.register = (data) => {
  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      let random_avatar_color = array[Math.floor(Math.random() * array.length)];

      auth.currentUser.updateProfile({
        displayName: data.firstName + " " + data.lastName,
        email: data.email,
        photoURL: `https://ui-avatars.com/api/?background=${random_avatar_color.background}&color=${random_avatar_color.color}&name=${data.firstName}+${data.lastName}`,
      });

      auth.currentUser.sendEmailVerification();
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        email_duplicate = data.email;
        registerOptionalValidation(document.getElementById("register-form"));
      }
    });
};

model.signIn = (data) => {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        email_not_found = data.email;
      } else if (err.code === "auth/wrong-password") {
        password_wrong = data.password;
      }
      signInOptionalValidation(document.getElementById("sign-in-form"));
    });
};

model.signOut = () => {
  auth
    .signOut()
    .then(() => {
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};

model.signInWithGoogle = () => {
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
model.signInWithFacebook = () => {
  let facebookProvider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(facebookProvider)
    .then((result) => {
      console.log(result);
      auth.currentUser.updateProfile({
        photoURL: result.additionalUserInfo.profile.picture.data.url,
      });
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
