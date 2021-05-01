function init_chat() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    let form = document.getElementById("my-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let msg_content = form["my-input"].value.trim();
        if (msg_content != "") {
            document.getElementById("main-chat").innerHTML += `
            <div class="d-flex px-5 message-right">
                <div class="message-child-container zoom-in">
                    <p class="p-2 text-break truncation" onclick="this.classList.toggle('truncation')">${msg_content}</p>
                </div>
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