const sample = {};

sample.message = (content, side, timestamp) => {
  return `
  <div class="d-flex px-5 message-${side} m-0">
    <div class="msg-container zoom-in">
      <p class="p-2 text-break message-content" data-bs-toggle="tooltip" data-bs-placement="${side === "right" ? "left" : "right"}" title="${render_time(new Date(timestamp))}">
        ${content}
      </p>
    </div>
  </div>
  `;
};

sample.image = (imgURL, side) => {
  return `
  <div class="d-flex px-5 message-${side} mb-2">
    <img class="zoom-in" src="${imgURL}">
  </div>
  `;
};

sample.person = (id, photoURL, name, recent_content = "Chick here to start chatting") => {
  return `
  <div class="p-3 border-bottom d-flex justify-content-between align-items-center person" onclick="set_chat_user('${id}')" id="${id}">
    <img src="${photoURL}" alt="" width="56px" height="56px" style="border-radius: 50%" class="me-md-3" />
    <div class="d-md-flex d-none flex-column justify-content-center" style="min-width: 180px; flex-grow: 1;">
        <b>${name}</b>
        <p class="m-0 text-truncate recent-content" style="max-width: 200px;">${recent_content}</p>
    </div>
  </div>
  `;
};

sample.chatUser = (photoURL, name) => {
  return `
  <img src="${photoURL}" alt="" width="40px" height="40px" style="border-radius: 50px" />
  <b class="ms-2">${name}</b>
  `;
};

sample.noMessageWarning = () => {
  return `
    <p class="text-center">No messages yet, let's begin chatting</p>
  `;
};

sample.loadingSpin = () => {
  return `
  <div class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  `;
};
