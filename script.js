const categories = [
  {
    id: 1,
    type: "burger",
  },
  {
    id: 2,
    type: "pizza",
  },
  {
    id: 3,
    type: "snack",
  },
  {
    id: 4,
    type: "drink",
  },
  {
    id: 5,
    type: "dessert",
  },
  {
    id: 6,
    type: "salad",
  },
];

const products = [
  {
    id: 1,
    name: "beef burger",
    price: "3$",
    categoryId: 1,
  },
  {
    id: 2,
    name: "cheese burger",
    price: "4$",
    categoryId: 2,
  },
  {
    id: 3,
    name: "veg burger",
    price: "5$",
    categoryId: 3,
  },
  {
    id: 4,
    name: "peperoni burger",
    price: "7$",
    categoryId: 4,
  },
];

window.onload = () => {
  renderProducts(products);
};

// render categories
const ulElement = document.querySelector("#categories-parent");

for (const item of categories) {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = item.type;
  buttonElement.type = "button";

  // attach the category id to the button
  buttonElement.setAttribute("id", item.id);

  // add even listener
  buttonElement.addEventListener("click", (event) => {
    const clickedBtnId = event.target.id;

    // filter products
    const filteredProducts = products.filter(
      (product) => product.categoryId === Number(clickedBtnId)
    );

    renderProducts(filteredProducts);
  });

  // btn styles
  buttonElement.style.margin = "20px";
  buttonElement.style.fontSize = "40px";
  buttonElement.style.padding = "20px";
  buttonElement.style.border = "1px solid ";

  // btn hover styles
  buttonElement.onmouseover = function () {
    buttonElement.style.backgroundColor = "yellow";
    buttonElement.style.color = "white";
  };
  buttonElement.onmouseout = function () {
    buttonElement.style.backgroundColor = "white";
    buttonElement.style.color = "black";
  };

  // append button to ul
  ulElement.appendChild(buttonElement);
}

// it's job is to render the products to the DOM
function renderProducts(products) {
  const productsParent = document.querySelector("#foodDisplay");

  // clear the products parent
  productsParent.innerHTML = "";

  // render products
  products.forEach((product) => {
    const divElement = document.createElement("div");
    divElement.classList.add("flex", "space-x-3");

    divElement.innerHTML = `
  <img src="https://cdn.sanity.io/images/f5uukjzq/production/18d89cfa5552c60a11060d945db03db7d44c6b7b-3384x3076.jpg" class="w-32" />

  <div>
    <h2>${product.name}</h2>
    <span>${product.price}</span>
  </div>
  `;

    productsParent.appendChild(divElement);
  });
}