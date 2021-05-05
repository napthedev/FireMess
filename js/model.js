const model = {};

model.register = (data) => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((user) => {
            auth.currentUser.updateProfile({
                displayName: data.firstName + " " + data.lastName,
                email: data.email,
                photoURL: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=OafLHlwaMo8AX_8imXr&_nc_ht=scontent-hkg4-1.xx&tp=27&oh=35925a41903994347ac7d0c328202a3b&oe=60B5B738",
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
    auth.signInWithEmailAndPassword(data.email, data.password)
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
    auth.signInWithPopup(googleProvider)
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
    auth.signInWithPopup(facebookProvider)
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
