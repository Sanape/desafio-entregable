const product = document.getElementById('product');
const productId = product.innerText.replace('Product: ', '');
let foundProduct;
const productContainer = document.getElementById('productContainer');
const addCartForm = document.getElementById('addCartForm');
const quantity = document.getElementById('quantity');
addCartForm.onsubmit = async (e) => {
  e.preventDefault();

  if (quantity.value >= 1) {
    await addProductToCart(productId, quantity.value);
  } else {
    alert('La cantidad debe ser mayor o igual a 1');
  }
};

async function getProduct() {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}`
    );
    const responseJson = await response.json();

    foundProduct = { ...responseJson.product };

    compileProduct();
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function addProductToCart(_productId, _quantity) {
  try {
    const result = await fetch(
      `http://localhost:8080/api/carts/652ec71d9979b1abeaab9b8d/products/${_productId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: _quantity }),
      }
    );
    if (result) {
      alert('Producto añadido al carrito: 652ec71d9979b1abeaab9b8d');
    }
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

function compileProduct() {
  const productTemplate = `
      <p>Title: ${foundProduct.title}</p>
      <p>Description: ${foundProduct.description}</p>
      <p>Price: ${foundProduct.price}</p>
      <p>Code: ${foundProduct.code}</p>
      <p>Stock: ${foundProduct.stock}</p>
    `;
  productContainer.innerHTML = productTemplate;
}

getProduct();
