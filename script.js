document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const menuItems = document.querySelector(".menu-items");
  const roomSelector = document.getElementById("room-selector");
  const locationImage = document.getElementById("location-image");
  const roomVideo = document.getElementById("room-video");
  const modal = document.getElementById("customModal");
  const closeModal = document.getElementsByClassName("close")[0];
  const modalText = document.getElementById("modalText");

  // Initially hide the modal
  modal.style.display = "none";

  // Toggle menu display
  menuIcon.addEventListener("click", function () {
    const displayStatus = menuItems.style.display;
    menuItems.style.display = displayStatus === "block" ? "none" : "block";
  });

  const rooms = [
    { name: "AD Class 1,2", video: "ad12.mp4" },
    { name: "AD Class 3", video: "ad3.mp4" },
    { name: "AD Class 4", video: "ad4.mp4" },
    { name: "Akshara / Mudra / Mantra Hall", video: "mfm.mp4" },
    { name: "BFT Class 2", video: "bft2.mp4" },
    { name: "DFT Computer Lab 6,7", video: "cl67.mp4" },
    { name: "DFT PM Lab", video: "dftpm.mp4" },
    { name: "FC Computer Lab / Mac Lab", video: "fclab.mp4" },
    { name: "FC VM Lab", video: "fc.mp4" },
    { name: "FD Studio / Art Room / PM Lab", video: "fd.mp4" },
    { name: "FP Batch 1,2", video: "fp12.mp4" },
    { name: "FP Batch 4 (202)", video: "kd.mp4" },
    { name: "FP Batch 5 (301) / 6 (302)", video: "misc1.mp4" },
    { name: "KD Art room / PM / GC Lab", video: "kd.mp4" },
    { name: "KD Lab", video: "kdlab.mp4" },
    { name: "LD Art Room", video: "ld.mp4" },
    { name: "TD Class 1,2,3", video: "td.mp4" },
    { name: "KC Hall / Theory Room 1,2", video: "misc2.mp4" },
    { name: "MDes (305) / Sarojni Naidu / Exhibition Hall", video: "misc1.mp4" },
  ];

  // Populate the room selector dynamically
  rooms.forEach((room) => {
    let option = document.createElement("option");
    option.value = room.video;
    option.textContent = room.name;
    roomSelector.appendChild(option);
  });

  let interval; // Declare the interval variable outside to make it accessible to other functions

  // Handle room selection changes
  roomSelector.addEventListener("change", function () {
    const selectedVideo = this.value;
    const roomName = this.options[this.selectedIndex].text;
    if (selectedVideo) {
      locationImage.style.display = "none";
      roomVideo.style.display = "block";
      roomVideo.src = `ofroom/${selectedVideo}`;
      roomVideo.load();
      let countdown = 3; // Set the countdown time in seconds
      modalText.textContent = `${roomName} tour video guide will start playing in ${countdown} seconds...`;
      modal.style.display = "block";

      interval = setInterval(() => {
        countdown--;
        modalText.textContent = `${roomName} tour video guide will start playing in ${countdown} seconds...`;
        if (countdown <= 0) {
          clearInterval(interval);
          modal.style.display = "none";
          roomVideo.play();
        }
      }, 1000);
    } else {
      roomVideo.style.display = "none";
      roomVideo.removeAttribute("src");
      roomVideo.load();
      locationImage.style.display = "block";
    }
  });

  // Handling for manual closing of modal
  closeModal.onclick = function () {
    clearInterval(interval);
    modal.style.display = "none";
    roomVideo.play();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      clearInterval(interval);
      modal.style.display = "none";
      roomVideo.play();
    }
  };
});
