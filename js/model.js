const model = {};

model.register = (data) => {
    auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
            auth.currentUser.updateProfile({
                displayName: data.firstName + " " + data.lastName,
                email: data.email,
                photoURL: "https://i.imgur.com/VXLM9xv.png"
            });

            auth.currentUser.sendEmailVerification();
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        })
}

model.signin = (data) => {
    auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            alert(err.message);
        })
}

model.signout = () => {
    auth.signOut()
        .catch(err => {
            console.log(err);
        })
}

model.resendEmail = () =>{
    auth.currentUser.sendEmailVerification()
    .catch(err => {
        console.log(err);
        alert(err.message);
    })
    ;
}