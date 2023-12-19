let products = [];
let error = "";
let nextLink = "";
let prevLink = "";

const productsList = document.getElementById("productsList");
const nextPage = document.getElementById("nextPage");
const prevPage = document.getElementById("prevPage");
const actualPage = document.getElementById("actualPage");
const welcome = document.getElementById("welcome");
const link = document.getElementById("link");

let userData = JSON.parse(localStorage.getItem("user"));

async function getActualUser(url = "http://localhost:8080/api/sessions/current") {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    localStorage.setItem("user", JSON.stringify(responseJson.message));
    userData = JSON.parse(localStorage.getItem("user"));
    welcome.innerHTML = `Welcome ${userData.role} ${userData.first_name} ${
      userData.last_name ? userData.last_name : ""
    }`;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

const params = new URLSearchParams(window.location.search);

getActualUser();

nextPage.onclick = async (e) => {
  e.preventDefault();
  await getAllProducts(nextLink);
};

prevPage.onclick = async (e) => {
  e.preventDefault();
  await getAllProducts(prevLink);
};

async function getAllProducts(url = "http://localhost:8080/api/products") {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    products = [...responseJson.result.payload];
    actualPage.innerHTML = responseJson.result.page;
    prevPage.disabled = !responseJson.result.hasPrevPage;
    nextPage.disabled = !responseJson.result.hasNextPage;
    nextLink = responseJson.result.nextLink;
    prevLink = responseJson.result.prevLink;

    compileProducts();
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getCartOfUser(url = "http://localhost:8080/api/carts") {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    link.href = `http://localhost:8080/carts/${responseJson.message._id}`;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

function compileProducts() {
  const productsTemplate = products
    .map(
      (product) => `<li>
      <p>Title: ${product.title}</p> 
      <p>Price: ${product.price}</p>
    </li>
    <button type="submit"><a href="http://localhost:8080/products/${product._id}">See details</a></button>
    `
    )
    .join(" ");
  productsList.innerHTML = productsTemplate;
}

getAllProducts();
getCartOfUser();
