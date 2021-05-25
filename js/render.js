let loading_message_count = 10;
let emoji_replace_list = {
  "😭": ["ToT", "T-T", "T_T", "T.T", ":((", ":-(("],
  "😓": ["'-_-"],
  "😜": [";p", ";-p", ";P", ";-P"],
  "😑": ["-_-"],
  "😢": [":'(", ":'-("],
  "😞": [":(", ":-(", "=(", ")=", ":["],
  "😐": [":|", ":-|"],
  "😛": [":P", ":-P", ":p", ":-p", "=P", "=p"],
  "😁": [":D", ":-D", "=D", ":d", ":-d", "=d"],
  "😗": [":*", ":-*"],
  "😇": ["O:)", "O:-)"],
  "😳": ["O_O", "o_o", "0_0"],
  "😊": ["^_^", "^~^", "=)"],
  "😠": [">:(", ">:-(", ">:o", ">:-o", ">:O", ">:-O"],
  "😎": ["8)", "B)", "8-)", "B-)", ":))"],
  "😚": ["-3-"],
  "😉": [";)", ";-)"],
  "😲": [":O", ":o", ":-O", ":-o"],
  "😣": [">_<", ">.<"],
  "😘": [";*", ";-*"],
  "😕": [":/", ":-/", ":\\", ":-\\", "=/", "=\\"],
  "🙂": [":)", ":]", ":-)", "(:", "(="],
  "♥": ["<3"],
  "😂": [":')"],
  "🤑": ["$-)"],
};

function set_chat_user(id) {
  // jshint ignore:start
  if (chatUser?.id === id) return 0;
  main_chat.innerHTML = sample.loadingSpin();
  loading_message_count = 10;
  // jshint ignore:end

  database
    .ref("users")
    .child(id)
    .get()
    .then((snapshot) => {
      chatUser = { ...snapshot.val(), id: id };
      document.getElementById("chat-user-info").innerHTML = sample.chatUser(chatUser.photoURL, chatUser.displayName);
      let input_box = document.getElementById("input-box").getElementsByTagName("input");
      for (let i = 0; i < input_box.length; i++) {
        if (input_box[i].id != "my-input") input_box[i].disabled = false;
      }
      document.getElementById("my-input").emojioneArea.enable();

      document.getElementsByClassName("person-focus")[0]?.classList.remove("person-focus"); // jshint ignore:line
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
          if (!child_snapshot.exists() && chatUser.id === id) {
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
  if (sender === chatUser.id) {
    side = "left";
  } else if (sender === auth.currentUser.uid && chatUser.id === chatUserId) {
    side = "right";
  }

  if (main_chat.innerHTML === sample.noMessageWarning()) {
    main_chat.innerHTML = "";
  }

  if (side != undefined) {
    if (type === "text") main_chat.innerHTML += sample.message(content, side);
    else if (type === "image") main_chat.innerHTML += sample.image(content, side);
  }
}

function arrange_user_id(id1, id2) {
  return id1 <= id2 ? id1 + "-" + id2 : id2 + "-" + id1;
}

function scroll_bottom() {
  setTimeout(() => {
    main_chat.scrollTop = main_chat.scrollHeight - main_chat.clientHeight;
  }, 300);
}

function replace_emoji(text) {
  text = ` ${text} `;

  for (const key in emoji_replace_list) {
    for (let i = 0; i < emoji_replace_list[key].length; i++) {
      text = text.replace(" " + emoji_replace_list[key][i] + " ", " " + key + " ");
    }
  }

  return text.trim();
}
