function init_chat() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    for (let i = 0; i < 3; i++) {
        document.getElementById("people").innerHTML += document.getElementById("people").innerHTML;
    }

    let form = document.getElementById("my-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let msg_content = form["my-input"].value.trim();
        if (msg_content != "") {
            document.getElementById("main-chat").innerHTML += `
            <div class="d-flex px-5 message-right">
                <p class="p-2 text-break animate">${msg_content}</p>
            </div>
            `
            form["my-input"].value = "";
            let main_chat = document.getElementById("main-chat");
            if (main_chat.scrollTop + main_chat.clientHeight >= main_chat.scrollHeight - 200) {
                main_chat.scrollTop = main_chat.scrollHeight - main_chat.clientHeight;
            }
        }
    })
}