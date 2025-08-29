const input = document.getElementById('no-type-input');
const user_api = "https://api.github.com/users/drona-gyawali"

 document.getElementById('email').addEventListener("click", () => {
    const to = "dronarajgyawali@gmail.com";
    const subject = "Hi there";
    const body = "I wanted to ask you about ...";
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(url, "_blank", "noopener");
  });



async function fetch_profile() {
  try {
    const response = await fetch(user_api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching profile:", error);
    return null;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const user = await fetch_profile();
  if (user) {
    document.getElementById("avatar").src = user.avatar_url;
  } else {
    document.getElementById("username").textContent = "Failed to load user.";
  }
});


// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
// })


document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey && event.shiftKey && event.key === "I") ||
      (event.ctrlKey && event.shiftKey && event.key === "C") ||
      (event.ctrlKey && event.key === "U") ||
      (event.key === "F12")) {
    event.preventDefault();
  }
});


function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}


function toggleMenu() {
    const nav = document.getElementById('nav-links');
    const ham = document.querySelector('.hamburger');

    nav.classList.toggle('show');
    ham.classList.toggle('open');

    if (nav.classList.contains('show')) {
      ham.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.classList.add('no-scroll');
    } else {
      ham.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.classList.remove('no-scroll');
    }
  }