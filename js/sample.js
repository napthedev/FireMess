const sample = {};

sample.message = (content, side) => {
  return `
  <div class="d-flex px-5 message-${side} m-0">
    <div class="msg-container zoom-in">
      <p class="p-2 text-break message-content">
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

sample.carousel = () => {
  return `
  <div id="carouselExampleCaptions" class="carousel carousel-dark slide h-100" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner h-100">
      <div class="carousel-item active h-100">
        <img src="https://i.imgur.com/qqQxJQR.png"  width="auto" class="d-block mx-auto h-100" alt="..." />
      </div>
      <div class="carousel-item h-100">
        <img src="https://i.imgur.com/EqqHZiP.png" width="auto" class="d-block mx-auto h-100" alt="..." />
      </div>
      <div class="carousel-item h-100">
        <img src="https://i.imgur.com/zIBXuB3.png" width="auto" class="d-block mx-auto h-100" alt="..." />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
`;
};
