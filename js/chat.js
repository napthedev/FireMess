function init_chat() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    readEmojiFile("../result.txt");

    let form = document.getElementById("my-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let msg_content = form["my-input"].value.trim();
        if (msg_content != "") {
            document.getElementById("main-chat").innerHTML += `
            <div class="d-flex px-5 message-right m-0">
                <div class="msg-container zoom-in">
                    <p class="p-2 text-break message-content truncation" onclick="this.classList.toggle('truncation');">${msg_content}</p>
                </div>
            </div>
            `
            form["my-input"].value = "";
            scroll_bottom();
        }
    })
}

function send_emoji(el) {
    document.getElementById("main-chat").innerHTML += `
    <div class="d-flex px-5 message-right m-0">
        <div class="msg-container zoom-in">
            <p class="p-2 message-content fs-1">${el.innerText}</p>
        </div>
    </div>
    `
    scroll_bottom();
}

function readEmojiFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                document.getElementById("emojis").innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}

function scroll_bottom() {
    let main_chat = document.getElementById("main-chat");
    main_chat.scrollTop = main_chat.scrollHeight - main_chat.clientHeight;
}

function readImageFile() {
    let file = document.getElementById("browse").files[0];
    let reader = new FileReader();
    reader.addEventListener("load", function () {
        let validImageTypes = ["image/x-png", "image/gif", "image/jpeg"];
        if (validImageTypes.includes(file["type"])) {
            let img_el = document.createElement("img");
            img_el.src = reader.result;
            let img_container = `
            <div class="d-flex px-5 message-right mb-2">
                <div style="margin-left: auto; margin-right: 0; transform-origin: 100% 100%;" class="zoom-in">
                    ${img_el.outerHTML}
                </div>
            </div>
            `
            document.getElementById("main-chat").innerHTML += img_container;
        }
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}