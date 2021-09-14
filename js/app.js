const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
        <img class="product-image my-3" src=${image}></img>
      </div>
      <h4 class="fw-normal mb-3">${product.title}</h4>
      <p class="fw-bold fst-italic mb-3">Category: ${product.category}</p>
      <h6 class=" mb-3">Product Rating: ${product.rating.rate}</h6>
      <h6 class=" mb-3">Total Rating: ${product.rating.count}</h6>
      <h5 class=" mb-3">Price: $ ${product.price}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
      <button onclick="loadProductDetail(${product.id})" id="details-btn" class="btn btn-success">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge("price", price);
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = (id, value) => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// details-button
let loadProductDetail = p => {
  const url = `https://fakestoreapi.com/products/${p}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayProductDetail(data));
}

let displayProductDetail = product => {
  let productDetails = document.getElementById('product-details');
  productDetails.innerHTML = '';
  let div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <div class="single-product">
    <div>
      <img class="product-image mx-auto" src=${product.image}></img>
    </div>
    <div class="w-50">
      <h3 class="text-center">${product.title}</h3>
      <p class="text-center">${product.description}</p>
      <h5 class="text-center">Product Rating: ${product.rating.rate}</h5>
      <h3 class="text-center">Price: $ ${product.price}</h3>
    </div>
  </div>`;
  productDetails.appendChild(div);
}