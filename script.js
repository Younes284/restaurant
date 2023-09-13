const PROJECT_ID = "g7b8yghy";

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-08-20/data/query/production`;

const IMAGES_URL = `https://cdn.sanity.io/images/${PROJECT_ID}/production`;

let categories, products;

let selectedCategoryId = null;

async function getCategories() {
  // get categories from API (sanity)
  const response = await fetch(`${API_URL}?query=*[_type == "category"]`);
  const data = await response.json();

  categories = data.result.map((category) => ({
    id: category._id,
    title: category.title,
  }));

  renderCategories();
}

async function getProducts() {
  // get products from API (sanity)
  const response = await fetch(`${API_URL}?query=*[_type == "product"]`);
  const data = await response.json();

  products = data.result.map((product) => ({
    id: product._id,
    title: product.title,
    price: product.price,
    description: product.description,
    categoryId: product.category._ref,
    image: `${IMAGES_URL}/${product.mainImage.asset._ref}`
      .replace("image-", "")
      .replace(/-(?=png|jpg|jpeg|gif)/, "."),
  }));

  renderProducts(products);
}

function renderCategories() {
  const ulElement = document.querySelector("#categories-parent");

  for (const category of categories) {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = category.title;
    buttonElement.type = "button";

    // attach the category id to the button (needed for highlighting the selected button)
    buttonElement.setAttribute("id", category.id);

    // add even listener
    buttonElement.addEventListener("click", (event) => {
      const clickedBtnId = Number(event.target.id);

      // if the user clicked the same button again, remove the filter
      if (selectedCategoryId === clickedBtnId) selectedCategoryId = null;
      // else set the selectedCategoryId to the clicked button id
      else selectedCategoryId = clickedBtnId;

      // get all buttons to check wethere we should highlight the button or not
      const buttons = document.querySelectorAll("#categories-parent button");

      buttons.forEach((btn) => {
        if (selectedCategoryId === Number(btn.id)) {
          btn.style.backgroundColor = "yellow";
          btn.style.color = "white";
        } else {
          btn.style.backgroundColor = "white";
          btn.style.color = "black";
        }
      });

      // filter products based on the selected category id, if no category id is selected, show all products, else show the products that have the same category id as the selected category id
      const filteredProducts = products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      );

      renderProducts(filteredProducts);
    });

    // btn styles
    buttonElement.style.margin = "20px";
    buttonElement.style.fontSize = "40px";
    buttonElement.style.padding = "20px";
    buttonElement.style.border = "1px solid ";

    // btn hover styles
    // buttonElement.onmouseover = function () {
    //   buttonElement.style.backgroundColor = "yellow";
    //   buttonElement.style.color = "white";
    // };
    // buttonElement.onmouseout = function () {
    //   buttonElement.style.backgroundColor = "white";
    //   buttonElement.style.color = "black";
    // };

    // append button to ul
    ulElement.appendChild(buttonElement);
  }
}

// it's job is to render the products to the DOM
function renderProducts(products) {
  const productsParent = document.querySelector("#foodDisplay");

  // clear the products parent
  productsParent.innerHTML = "";

  // render products
  products.forEach((product) => {
    const divElement = document.createElement("div");
    divElement.classList.add("flex", "space-x-3", "shadow", "rounded");

    divElement.innerHTML = `
  <img src=${product.image} class="w-32" />

  <div>
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <span>${product.price}</span>
  </div>
  `;

    productsParent.appendChild(divElement);
  });
}

window.onload = () => {
  getCategories();
  getProducts();
};
