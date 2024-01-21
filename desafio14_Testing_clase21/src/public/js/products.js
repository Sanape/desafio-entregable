const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
let page = urlParams.get("page") || 1;
let hrefProducts = `http://localhost:8080/products?page=${page}`;
const order = document.getElementById("order");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const minDiscount = document.getElementById("minDiscount");
const maxDiscount = document.getElementById("maxDiscount");
const categorySelect = document.getElementById("categorySelect");
const foundProducts = document.getElementById("foundProducts");

async function getProducts() {
  let orderParams = JSON.stringify({
    sort: urlParams.get("sort"),
    order: urlParams.get("order"),
  });

  if (!urlParams.get("sort") || !urlParams.get("order")) {
    orderParams = "";
  }

  order.value = orderParams;

  try {
    let url = `http://localhost:8080/api/products?limit=12&`;

    if (urlParams.size > 0) {
      for (let [key, value] of urlParams) {
        url = url + key + "=" + value + "&";
      }
    }

    url = url.slice(0, url.length - 1);

    let response;
    if (Cookies.get("token")) {
      response = await axios.get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
    } else {
      response = await axios.get(url);
    }
    console.log(response.data.message);
    compileProducts(response.data.message.rows);
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

async function getCategories() {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");

    categorySelect.innerHTML = `
      <option value="">None</option>
      `;

    response.data.message.forEach((category) => {
      categorySelect.innerHTML =
        categorySelect.innerHTML +
        `
      <option value='{"filter":"category","filterValue":"${category.id}" }'>${category.category_name}</option>
      `;
    });
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

async function compileProducts(products) {
  const productsTemplate = products.map(
    (product) => `
      <a href="http://localhost:8080/products/${product.id}" class="w-fit h-fit"
      >
      <div class="flex flex-col justify-center items-center relative" >
      <div style="width:50px;height:50px;display:${
        +product.discount ? "flex" : "none"
      }" class="absolute bottom-[60px] right-[-10px] rounded-full bg-orange-600 items-center justify-center ">
        <p class="text-md text-white secondary-font mb-1">-${
          product.discount
        }%</p> 
      </div>
      <img src="${
        product.url_front_page
      }" style="width:200px;height:270px;" class="rounded-t-lg"/>
      <div class="rounded-b-lg bg-white p-2 flex flex-col justify-center items-center" style="width:200px;height:80px;">
      <p class="text-center primary-font">${product.title}</p>
      <span class="w-full flex gap-x-2 items-center justify-center">
      <p class="${
        product.discount
          ? "line-through text-slate-500 text-sm secondary-font"
          : "text-sm secondary-font"
      }">${product.price} USD</p>
      <p class="text-sm secondary-font">${
        product.discount
          ? (+product.price * (1 - +product.discount / 100)).toFixed(2) + " USD"
          : ""
      }</p>
      </span>
      </div>
      <div/>
      </a>
      `
  );

  productsTemplate.forEach((template) => {
    foundProducts.innerHTML = foundProducts.innerHTML + template;
  });
}

getProducts();
getCategories();

order.onchange = (e) => {
  e.preventDefault();

  const orderAsked = JSON.parse(order.value);

  if (order.value && !urlParams.get("filter")) {
    hrefProducts =
      hrefProducts + `&sort=${orderAsked.sort}&order=${orderAsked.order}`;
  } else if (order.value && urlParams.get("filter")) {
    hrefProducts =
      hrefProducts +
      `&sort=${orderAsked.sort}&order=${
        orderAsked.order
      }&filter=${urlParams.get("filter")}&filterValue=${urlParams.get(
        "filterValue"
      )}`;
  }

  location.href = hrefProducts;
};

categorySelect.onchange = (e) => {
  e.preventDefault();

  const categoryAsked = JSON.parse(categorySelect.value);

  if (categorySelect.value && !urlParams.get("sort")) {
    hrefProducts =
      hrefProducts +
      `&filter=${categoryAsked.filter}&filterValue=${categoryAsked.filterValue}`;
  } else if (categorySelect.value && urlParams.get("sort")) {
    hrefProducts +
      `&filter=${categoryAsked.filter}&filterValue=${categoryAsked.filterValue}
      &sort=${urlParams.get("sort")}&order=${urlParams.get("order")}`;
  }

  location.href = hrefProducts;
};
