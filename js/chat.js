function init_chat() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  $(document).ready(function () {
    $("#my-input").emojioneArea({
      pickerPosition: "bottom",
    });
  });

  let my_input = $("#my-input").emojioneArea();
  my_input[0].emojioneArea.on("keydown", function (btn, event) {
    if (event.keyCode == 13) {
      get_message();
    }
  });
}

function get_message() {
  let my_input = $("#my-input").emojioneArea();
  let msg_content = my_input[0].emojioneArea.getText().trim();
  if (msg_content != "") {
    document.getElementById("main-chat").innerHTML += `
            <div class="d-flex px-5 message-right m-0">
                <div class="msg-container zoom-in">
                    <p class="p-2 text-break message-content truncation" onclick="this.classList.toggle('truncation');">${msg_content}</p>
                </div>
            </div>
            `;
    scroll_bottom();
    my_input[0].emojioneArea.setText("");
    if (!document.getElementsByClassName("emojionearea-picker")[0].classList.contains("hidden")) {
      document.getElementsByClassName("emojionearea-button-close")[0].click();
    }
  }
}

function readImageFile(el, type) {
  let file = el.files[0];
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      if (type.includes(file["type"])) {
        let img_el = document.createElement("img");
        img_el.src = reader.result;
        let img_container = `
            <div class="d-flex px-5 message-right mb-2">
                <div style="margin-left: auto; margin-right: 0; transform-origin: 100% 100%;" class="zoom-in">
                    ${img_el.outerHTML}
                </div>
            </div>
            `;
        document.getElementById("main-chat").innerHTML += img_container;
        scroll_bottom();
      }
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function scroll_bottom() {
  let main_chat = document.getElementById("main-chat");
  main_chat.scrollTop = main_chat.scrollHeight - main_chat.clientHeight;
}
