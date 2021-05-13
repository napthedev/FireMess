let chatUser = undefined;
let newItems = {};
let main_chat;
let loading_message_count = 10;
let loading = false;

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

  main_chat = document.getElementById("main-chat");

  main_chat.innerHTML = sample.carousel();
  document.getElementById("chat-user-info").innerHTML = sample.chatUser("https://i.imgur.com/CDqQHpR.jpg", "Select an user to start chatting");
  let input_box = document.getElementById("input-box").getElementsByTagName("input");
  for (let i = 0; i < input_box.length; i++) {
    if(input_box[i].id != "my-input")
    input_box[i].disabled = true;
  }
  document.getElementById("my-input").emojioneArea.disable();


  let profile_picture_el = document.getElementsByClassName("profile-picture");
  for (let i = 0; i < profile_picture_el.length; i++) {
    profile_picture_el[i].src = auth.currentUser.photoURL;
  }
  document.getElementById("profile-email").innerText = auth.currentUser.email;
  document.getElementById("profile-id").innerText = auth.currentUser.uid;

  database.ref("users").on("child_added", (snapshot) => {
    let user = snapshot.val();
    if (snapshot.key != auth.currentUser.uid) {
      document.getElementById("people").innerHTML += sample.person(snapshot.key, user["photoURL"], user["displayName"]);

      database
        .ref("messages")
        .child(arrange_user_id(auth.currentUser.uid, snapshot.key))
        .limitToLast(1)
        .on("child_added", (data) => {
          document.getElementById(snapshot.key).getElementsByClassName("recent-content")[0].innerText = data.val().type == "image" ? "Image" : data.val().content;
          if (!newItems[arrange_user_id(auth.currentUser.uid, snapshot.key)]) return;
          render_message(data.val().sender, snapshot.key, data.val().content, data.val().type);
          scroll_bottom();
        });

      database
        .ref("messages")
        .child(arrange_user_id(auth.currentUser.uid, snapshot.key))
        .once("value", () => {
          newItems[arrange_user_id(auth.currentUser.uid, snapshot.key)] = true;
        });
    }
  });

  main_chat.addEventListener("scroll", () => {
    if (main_chat.scrollTop == 0 && main_chat.scrollHeight > main_chat.clientHeight && !loading) {
      load_previous_messages();
    }
  });
}

function get_message() {
  let my_input = $("#my-input").emojioneArea();
  let msg_content = my_input[0].emojioneArea.getText().trim();
  if (msg_content != "") {
    my_input[0].emojioneArea.setText("");
    if (!document.getElementsByClassName("emojionearea-picker")[0].classList.contains("hidden")) {
      document.getElementsByClassName("emojionearea-button-close")[0].click();
    }
    send_message(msg_content);
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
      } else if (type.includes(file["type"])) {
        database.ref("messages").child(arrange_user_id(auth.currentUser.uid, chatUser.id)).push({
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

function send_message(message) {
  database.ref("messages").child(arrange_user_id(auth.currentUser.uid, chatUser.id)).push({
    sender: auth.currentUser.uid,
    content: message,
    type: "text",
  });
}

function scroll_bottom() {
  setTimeout(() => {
    main_chat.scrollTop = main_chat.scrollHeight - main_chat.clientHeight;
  }, 300);
}

function arrange_user_id(id1, id2) {
  return id1 <= id2 ? id1 + "-" + id2 : id2 + "-" + id1;
}

function set_chat_user(id) {
  if (chatUser?.id == id) return;

  main_chat.innerHTML = sample.loadingSpin();
  loading_message_count = 10;

  database
    .ref("users")
    .child(id)
    .get()
    .then((snapshot) => {
      chatUser = { ...snapshot.val(), id: id };
      document.getElementById("chat-user-info").innerHTML = sample.chatUser(chatUser.photoURL, chatUser.displayName);
      let input_box = document.getElementById("input-box").getElementsByTagName("input");
      for (let i = 0; i < input_box.length; i++) {
        if(input_box[i].id != "my-input")
        input_box[i].disabled = false;
      }
      document.getElementById("my-input").emojioneArea.enable()

      document.getElementsByClassName("person-focus")[0]?.classList.remove("person-focus");
      document.getElementById(id).classList.add("person-focus");

      document.getElementById("chat-picture").src = chatUser.photoURL;
      document.getElementById("chat-email").innerText = chatUser.email;
      document.getElementById("chat-id").innerText = chatUser.id;

      database
        .ref("messages")
        .child(arrange_user_id(auth.currentUser.uid, id))
        .limitToLast(loading_message_count)
        .get()
        .then((child_snapshot) => {
          if (!child_snapshot.exists() && chatUser.id == id) {
            main_chat.innerHTML = sample.noMessageWarning();
          } else {
            let child_data = child_snapshot.val();
            main_chat.innerHTML = "";
            for (const key in child_data) {
              render_message(child_data[key].sender, id, child_data[key].content, child_data[key].type);
              scroll_bottom();
            }
          }
        });
    });
}

function load_previous_messages() {
  loading = true;
  loading_message_count += 10;

  main_chat.innerHTML = sample.loadingSpin() + main_chat.innerHTML;
  database
    .ref("messages")
    .child(arrange_user_id(auth.currentUser.uid, chatUser.id))
    .limitToLast(loading_message_count)
    .get()
    .then((child_snapshot) => {
      let child_data = child_snapshot.val();
      main_chat.innerHTML = "";
      for (const key in child_data) {
        render_message(child_data[key].sender, chatUser.id, child_data[key].content, child_data[key].type);
      }
      loading = false;
      setTimeout(() => {
        main_chat.scrollTop = 5;
      }, 300);
    });
}

function render_message(sender, chatUserId, content, type) {
  let side;
  if (sender == chatUser.id) {
    side = "left";
  } else if (sender == auth.currentUser.uid && chatUser.id == chatUserId) {
    side = "right";
  }

  if (main_chat.innerHTML == sample.noMessageWarning()) {
    main_chat.innerHTML = "";
  }

  if (side != undefined) {
    if (type == "text") main_chat.innerHTML += sample.message(content, side);
    else if (type == "image") main_chat.innerHTML += sample.image(content, side);
  }
}
