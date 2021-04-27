const conponent = {};

conponent.chatScreen = `
<div class="d-flex vw-100">
    <div class="border-end border-bottom vh-100 p-0 d-flex flex-column" style="flex: 0 1 auto;">
    <div style="flex: 0 1 auto;">
        <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
                <a class="navbar-brand d-md-block d-none" href="#">
                    <img src="https://i.imgur.com/WZqIKV4.png" width="auto" height="35px" alt="">
                </a>

                <div class="dropdown">
                    <a class="dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="./image.jpg" width="36px" height="36px" style="border-radius: 50px;" alt="">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><span onclick="model.signout();" class="dropdown-item" href="#"><i class="fa fa-sign-out-alt"></i> Log out</span>
                        </li>
                        <li><a class="dropdown-item" href="#"><i class="fa fa-info-circle"></i> Info</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="p-1 position-relative px-3 d-md-block d-none">
            <a href="" class="position-absolute" style="top: 10px; left: 25px;">
                <i style="font-size: 20px;" id="search-icon" class="fa fa-search"></i>
            </a>

            <input type="text" class="form-control form-control-sm mb-3" style="padding-left: 35px;"
                placeholder="Search">
        </div>
    </div>

    <div id="people" class="d-flex flex-column border-top"
        style="overflow-x: hidden; overflow-y: auto; flex: 1 1 auto;">
        <div class="p-3 border-bottom d-flex justify-content-between align-items-center person">
            <div class="d-flex">
                <img src="./image.jpg" alt="" width="56px" height="56px" style="border-radius: 50%;" class="me-md-3">
                <div class="d-md-flex d-none flex-column justify-content-center" style="min-width: 180px;">
                    <b>Example person</b>
                    <p class="m-0">Hello. How are you?</p>
                </div>

            </div>
            <div class="ps-1 align-items-center d-md-flex d-none">
                <p class="m-0">10:10</p>
            </div>
        </div>

    </div>
    </div>
    <div class="vh-100 p-0 d-flex flex-column" style="flex: 1 1 auto;" id="right-panel">
    <div style="flex: 0 1 70px;" class="border-bottom d-flex align-items-center justify-content-between px-3">
        <div>
            <img src="./image.jpg" alt="" width="40px" height="40px" style="border-radius: 50px;">
            <b class="ms-2">Example person</b>
        </div>
        <a href="" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Info">
            <i class="fa fa-info-circle"></i>
        </a>
    </div>

    <div id="main-chat" class="overflow-auto pt-3" style="flex: 1 1 auto;">
        <div class="d-flex px-5 message-left m-0">
            <p class="p-2 text-break">Hello. How are you?</p>
        </div>
        <div class="d-flex px-5 message-right m-0">
            <p class="p-2 text-break">I'm fine. Thank you.</p>
        </div>
    </div>

    <div style="flex: 0 1 50px;" class="d-flex justify-content-evenly align-items-center px-1">
        <a style="flex: 0 1 40px;" class="d-flex justify-content-center" href="" data-bs-toggle="tooltip"
            data-bs-placement="top" title="Send an image">
            <i class="fa fa-image"></i>
        </a>
        <a style="flex: 0 1 40px;" class="d-flex justify-content-center" href="" data-bs-toggle="tooltip"
            data-bs-placement="top" title="Send an emoji">
            <i class="fa fa-smile"></i>
        </a>
        <form style="flex: 1 1 auto;" class="d-flex" id="my-form">
            <input style="flex: 1 1 auto;" id="my-input" type="text" class="h-75 form-control"
                placeholder="Message..." autocomplete="off">
            <button style="border: none; outline: none; background-color: transparent; flex: 0 1 50px;"
                data-bs-toggle="tooltip" data-bs-placement="top" title="Send">
                <a href="">
                    <i class="fa fa-paper-plane"></i>
                </a>

            </button>
        </form>
    </div>
    </div>
</div>
`

conponent.registerScreen = `
    <div class="vh-100 vw-100" style="background: linear-gradient(250deg, #5fd6dc, #e93af7);"></div>
    <div style="width: 100%; max-width: 450px; background-color: white; padding: 20px; position: absolute; top: 50%; left: 50%; border-radius: 20px; transform: translate(-50%, -50%);">
        <form id="register-form" class="row g-3 needs-validation" novalidate oninput='optionalValidation();'>
            <h1 class="text-center">
                Sign up
            </h1>
            <div class="col-md-6">
                <label for="firstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstName" required>
                <div class="invalid-feedback">
                    Please enter your first name.
                </div>
            </div>
            <div class="col-md-6">
                <label for="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" required>
                <div class="invalid-feedback">
                    Please enter your last name.
                </div>
            </div>
            <div class="col-md-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
                <div class="invalid-feedback">
                    Please provide a valid email.
                </div>
            </div>
            <div class="col-md-12">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required pattern=".{6,18}">
                <div class="invalid-feedback">
                    Password must be between 6-18 characters.
                </div>
            </div>
            <div class="col-md-12">
                <label for="confirmPassword" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="confirmPassword" required pattern=".{6,18}">
                <div class="invalid-feedback">
                    Passwords do not match.
                </div>
            </div>
            <div class="col-md-12">
                <span onclick="to_signin();" class="link-primary">Already have an account? Log in</span>
            </div>
            <div class="d-grid gap-2 col-md-12">
                <button class="btn btn-primary" type="submit">Sign up</button>
            </div>
        </form>
    </div>
`

conponent.signinScreen = `
    <div class="vh-100 vw-100" style="background: linear-gradient(250deg, #5fd6dc, #e93af7);"></div>
    <div style="width: 100%; max-width: 350px; background-color: white; padding: 20px; position: absolute; top: 50%; left: 50%; border-radius: 20px; transform: translate(-50%, -50%);">
        <form id="signin-form" class="row g-3 needs-validation" novalidate>
            <h1 class="text-center">
                Log in
            </h1>
            <div class="col-md-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
                <div class="invalid-feedback">
                    Please provide a valid email.
                </div>
            </div>
            <div class="col-md-12">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
                <div class="invalid-feedback">
                    Please input your password
                </div>
            </div>
            <div class="col-md-12">
                <span onclick="to_register();" class="link-primary">Haven't got any account? Sign up</span>
            </div>
            <div class="d-grid gap-2 col-md-12">
                <button class="btn btn-primary" type="submit">Log in</button>
            </div>
        </form>
    </div>
`

conponent.welcomeScreen = `
<div class="p-3 p-md-5 landing-page" style="overflow-x: hidden;">
<div class="d-flex justify-content-between align-items-center pb-2 pb-md-5">
    <a href=""><img src="https://i.imgur.com/WZqIKV4.png" alt=""></a>
    <div class="d-flex align-items-center">
        <b onclick="to_register();" style="font-size: 18px; cursor: pointer;" class="mx-2 navbar-link">SIGN
            UP</b>
        <b onclick="to_signin();" style="font-size: 18px; cursor: pointer;" class="mx-2 navbar-link">LOG IN</b>
    </div>
</div>
<div class="row full-height">
    <div class="col-md-7 d-md-block fade-left">
        <img width="100%" src="../img/background1.png" alt="">
    </div>
    <div class="col-md-5 d-flex flex-column justify-content-around py-5 fade-right" style="height: 300px;">
        <h1 class="mb-4" style="font-size: 45x;">
            The best way to chat with your friends
        </h1>
        <div class="d-flex d-md-block justify-content-center">
            <button onclick="to_register();" class="btn btn-primary btn-lg mb-4">
                Get started
            </button>
        </div>

    </div>
</div>

<div class="row full-height">
    <div class="col-md-6 offset-md-1 fade-left">
        <div class="py-5">
            <h1 class="mb-4" style="font-size: 45x;">
                Connect with your friends anywhere through our website
            </h1>
        </div>

    </div>
    <div class="col-md-5 d-md-block fade-right">
        <img width="100%" src="../img/background2.png" alt="">
    </div>
</div>


<div class="row">
    <div class="col-md-6 d-md-block fade-left">
        <img width="100%" src="../img/background3.png" alt="">
    </div>
    <div class="col-md-5 offset-md-1 fade-right">
        <div class="py-5">
            <h1 class="mb-4" style="font-size: 45x;">
                Your messages will be completely secured
            </h1>
        </div>
    </div>
</div>
</div>
`