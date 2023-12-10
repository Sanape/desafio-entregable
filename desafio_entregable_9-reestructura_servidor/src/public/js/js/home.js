let products = [];
let error = "";

const productsList = document.getElementById("productsList");

async function getAllProducts(url = "http://localhost:8080/api/products") {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    products = [...responseJson.result.payload];

    compileProducts();
  } catch (err) {
    error = err;
  }
}

function compileProducts() {
  const productsTemplate = products
    .map(
      (product) => `<li>
      <p>ID: ${product._id}</p> 
      <p>Title: ${product.title}</p> 
      <p>Description: ${product.description}</p> 
      <p>Price: ${product.price}</p> 
      <p>Code: ${product.code}</p> 
      <p>Stock: ${product.stock}</p>
    </li>`
    )
    .join(" ");
  productsList.innerHTML = productsTemplate;
}

getAllProducts();
