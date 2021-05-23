let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let email_duplicate = "";
function registerOptionalValidation(el) {
  el.confirmPassword.setCustomValidity(el.confirmPassword.value != el.password.value ? "." : "");
  el.firstName.setCustomValidity(el.firstName.value.trim() === "" || format.test(el.firstName.value) ? "." : "");
  el.lastName.setCustomValidity(el.lastName.value.trim() === "" || format.test(el.lastName.value) ? "." : "");
  el.email.setCustomValidity(el.email.value === email_duplicate ? "." : "");
  if (el.email.value === email_duplicate && email_duplicate) {
    document.getElementById("register-email-error").innerText = "Email is in use by another account.";
  } else {
    document.getElementById("register-email-error").innerText = "Please provide a valid email.";
  }
}

let email_not_found = "";
let password_wrong = "";
function signInOptionalValidation(el) {
  el.email.setCustomValidity(el.email.value === email_not_found ? "." : "");
  el.password.setCustomValidity(el.password.value === password_wrong ? "." : "");
  if (el.email.value === email_not_found && email_not_found) {
    document.getElementById("sign-in-email-error").innerText = "The email address you entered isn't connected to any account.";
  } else {
    document.getElementById("sign-in-email-error").innerText = "Please provide a valid email.";
  }

  if (el.password.value === password_wrong && password_wrong) {
    document.getElementById("sign-in-password-error").innerText = "The password that you've entered is incorrect.";
  } else {
    document.getElementById("sign-in-password-error").innerText = "Please input your password";
  }
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
        confirmPassword: register_form["confirmPassword"].value,
      };
      model.register(register_data);
    }
    register_form.classList.add("was-validated");
  });
};

const signInSubmit = function () {
  let login_form = document.getElementById("sign-in-form");
  login_form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!login_form.checkValidity()) {
      event.stopPropagation();
    } else {
      let login_data = {
        email: login_form["email"].value.trim(),
        password: login_form["password"].value,
      };
      model.signIn(login_data);
    }
    login_form.classList.add("was-validated");
  });
};
