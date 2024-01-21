const socketClient = io();
const actualYear = document.getElementById("actualYear");
actualYear.innerHTML = new Date().getFullYear();
const searchBar = document.getElementById("searchBar");
const cart = document.getElementById("cart");
cart.href = "http://localhost:8080/login";
let cartId = 0;
const login_section = document.getElementById("login-section");
const authenticated = Cookies.get("token") || Cookies.get("user");
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const sections = document.getElementById("sections");

login_section.innerHTML =
  authenticated && user
    ? `
    <span class="flex items-center justify-center gap-x-5">
      <p
        class="text-white secondary-font cursor-pointer"
        onclick="logout();"
      >Logout</p>
      <a href="http://localhost:8080/profile">
        <img src="${user.profilePhoto}" class="w-10 h-10 border-2 rounded-full border-orange-600 border-solid" />
      </a>
    </span>
      `
    : `<a
        href="http://localhost:8080/login"
        class="text-white secondary-font"
      >Login</a>
      <p class="text-white">|</p>
      <a
        href="http://localhost:8080/register"
        class="text-white secondary-font"
      >Register</a>`;

if (authenticated && user && user.role === "ADMIN") {
  sections.innerHTML =
    sections.innerHTML +
    "<a href='http://localhost:8080/realtimeProducts' class='secondary-font text-indigo-500 hover:bg-orange-600 px-4 py-2 hover:text-white'>Product Panel</a>";
  sections.innerHTML =
    sections.innerHTML +
    "<a href='http://localhost:8080/realtimeCategories' class='secondary-font text-indigo-500 hover:bg-orange-600 px-4 py-2 hover:text-white'>Category Panel</a>";
  sections.innerHTML =
    sections.innerHTML +
    "<a href='http://localhost:8080/realtimeDevelopers' class='secondary-font text-indigo-500 hover:bg-orange-600 px-4 py-2 hover:text-white'>Developer Panel</a>";
}

async function getCartOfCurrentUser() {
  try {
    let response;

    if (Cookies.get("token")) {
      response = await axios.get("http://localhost:8080/api/carts/", {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
    } else {
      response = await axios.get("http://localhost:8080/api/carts/");
    }

    cartId = response.data.message.id;

    Cookies.set("cartId", cartId);

    cart.href = `http://localhost:8080/carts/${cartId}`;
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

if (authenticated) {
  getCartOfCurrentUser();
}

searchBar.onkeyup = (e) => {
  e.preventDefault();
  if (e.keyCode === 13 && searchBar.value) {
    window.location(
      `http://localhost:8080/products?keyword=${searchBar.value}`
    );
  }
};

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

socketClient.on("newBought", (bought) => {
  myFunction();
});

async function logout() {
  try {
    const token = Cookies.get("token");

    Cookies.remove("token");
    Cookies.remove("user");

    await axios.delete("http://localhost:8080/api/sessions/", {
      headers: {
        Authorization: token,
      },
    });

    location.href = "http://localhost:8080/login";
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}
