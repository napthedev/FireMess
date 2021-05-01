let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function optionalValidation() {
    confirmPassword.setCustomValidity(confirmPassword.value != password.value ? "Passwords do not match." : "");
    firstName.setCustomValidity((firstName.value.trim() == "" || format.test(firstName.value)) ? "Please enter your first name." : "");
    lastName.setCustomValidity((lastName.value.trim() == "" || format.test(lastName.value)) ? "Please enter your last name." : "");
}

const registerSubmit = function () {
    let register_form = document.getElementById("register-form");
    register_form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!register_form.checkValidity()) {
            event.stopPropagation();
        } else {
            let register_data = {
                firstName: register_form["firstName"].value.trim(),
                lastName: register_form["lastName"].value.trim(),
                email: register_form["email"].value.trim(),
                password: register_form["password"].value,
                confirmPassword: register_form["confirmPassword"].value
            }
            model.register(register_data);
        }
        register_form.classList.add("was-validated");
    });
}

const signinSubmit = function () {
    let login_form = document.getElementById("signin-form");
    login_form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!login_form.checkValidity()) {
            event.stopPropagation();
        } else {
            let login_data = {
                email: login_form["email"].value.trim(),
                password: login_form["password"].value
            }
            model.signin(login_data);
        }
        login_form.classList.add("was-validated");
    })
}