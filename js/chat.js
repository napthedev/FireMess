let chatUser;
let newItems = {};
let main_chat;
let loading = false;

function init_chat() {
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  $(document).ready(function () {
    $("#my-input").emojioneArea({
      pickerPosition: "bottom",
    });
  });

  let my_input = $("#my-input").emojioneArea();
  my_input[0].emojioneArea.on("keydown", function (btn, event) {
    if (event.keyCode === 13) {
      get_message();
    }
  });

  document.getElementById("right-panel").style.display = "none";

  main_chat = document.getElementById("main-chat");

  let profile_picture_el = document.getElementsByClassName("profile-picture");
  for (let i = 0; i < profile_picture_el.length; i++) {
    profile_picture_el[i].src = auth.currentUser.photoURL;
  }
  document.getElementById("profile-email").innerText = auth.currentUser.email;
  document.getElementById("profile-id").innerText = auth.currentUser.uid;

  database.ref("users").on("child_added", (snapshot) => {
    let user = snapshot.val();
    if (snapshot.key != auth.currentUser.uid) {
      document.getElementById("people").innerHTML += sample.person(snapshot.key, user.photoURL, user.displayName);

      database
        .ref("messages")
        .child(arrange_user_id(auth.currentUser.uid, snapshot.key))
        .limitToLast(1)
        .on("child_added", (data) => {
          document.getElementById(snapshot.key).getElementsByClassName("recent-content")[0].innerText = data.val().type === "image" ? "Image" : data.val().content;
          if (!newItems[arrange_user_id(auth.currentUser.uid, snapshot.key)]) return;
          render_message(data.val(), data.key, snapshot.key);
          scroll_bottom();
          messages_tooltip();
        });

      database
        .ref("messages")
        .child(arrange_user_id(auth.currentUser.uid, snapshot.key))
        .once("value", () => {
          newItems[arrange_user_id(auth.currentUser.uid, snapshot.key)] = true;
        });
    }

    document.getElementsByClassName("person")[0]?.click();
  });

  main_chat.addEventListener("scroll", () => {
    if (main_chat.scrollTop === 0 && main_chat.scrollHeight > main_chat.clientHeight && !loading) {
      load_previous_messages();
    }
  });
}

function get_message() {
  let my_input = $("#my-input").emojioneArea();
  let msg_content = my_input[0].emojioneArea.getText().trim();
  if (msg_content != "") {
    msg_content = replace_emoji(msg_content);
    my_input[0].emojioneArea.setText("");
    if (!document.getElementsByClassName("emojionearea-picker")[0].classList.contains("hidden")) {
      document.getElementsByClassName("emojionearea-button-close")[0].click();
    }
    database
      .ref("messages")
      .child(arrange_user_id(auth.currentUser.uid, chatUser.id))
      .push({
        server_timestamp: {
          ".sv": "timestamp",
        },
        sender: auth.currentUser.uid,
        content: msg_content,
        type: "text",
      });
  }
}

function readImageFile(el, type) {
  let file = el.files[0];
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      if (file.size > 3145728) {
        alert("File is too big!!!");
      } else if (type.includes(file.type)) {
        database
          .ref("messages")
          .child(arrange_user_id(auth.currentUser.uid, chatUser.id))
          .push({
            server_timestamp: {
              ".sv": "timestamp",
            },
            sender: auth.currentUser.uid,
            content: reader.result,
            type: "image",
          });
      }
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function remove_message(key) {
  database.ref("messages").child(arrange_user_id(auth.currentUser.uid, chatUser.id)).child(key).remove();
}

function copy_to_clipboard(key) {
  let text = document.getElementById(key).getElementsByClassName("message-content")[0].innerText;
  if (!navigator.clipboard) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.display = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      let successful = document.execCommand("copy");
      let msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text " + msg);
    } catch (err) {
      console.log(err);
    }

    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Copying text to clipboard successful!");
    },
    (err) => {
      console.error(" Could not copy text: ", err);
    }
  );
}
