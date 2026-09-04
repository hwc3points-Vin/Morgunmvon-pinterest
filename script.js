const form = document.querySelector("#content-form");
const collectionSelect = document.querySelector("#collection-select");
const productSelect = document.querySelector("#product-select");
const productDetails = document.querySelector("#product-details");
const previewFrame = document.querySelector("#preview-frame");
let selectedProduct = null;

const outputs = {
  title: document.querySelector("#output-title"),
  description: document.querySelector("#output-description"),
  keywords: document.querySelector("#output-keywords"),
  prompt: document.querySelector("#output-prompt"),
};

const detailFields = [
  ["Product ID", "productId"],
  ["Product Type", "productType"],
  ["Style", "style"],
  ["Name", "name"],
  ["Number", "number"],
  ["Primary Color", "primaryColor"],
  ["Secondary Color", "secondaryColor"],
  ["Customization Type", "customizationType"],
];

function setOptions(select, placeholder, products) {
  select.replaceChildren(new Option(placeholder, ""));
  products.forEach((product) => {
    select.add(new Option(`${product.name} ${product.number}`, product.productId));
  });
}

function resetProductDisplay() {
  selectedProduct = null;
  productDetails.innerHTML = '<p class="empty-state">Select a product to view its library details.</p>';
  previewFrame.innerHTML = '<span class="preview-mark" aria-hidden="true">M</span><p>Product image<br>coming soon</p>';
}

function showProduct(product) {
  selectedProduct = product;
  const list = document.createElement("dl");
  detailFields.forEach(([label, key]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = product[key];
    item.append(term, description);
    list.append(item);
  });
  productDetails.replaceChildren(list);

  if (product.productImage) {
    const image = new Image();
    image.src = product.productImage;
    image.alt = `${product.name} ${product.number}`;
    previewFrame.replaceChildren(image);
  } else {
    previewFrame.innerHTML = `<span class="preview-mark" aria-hidden="true">${product.number}</span><p>${product.productId}<br>Image coming soon</p>`;
  }
}

[...new Set(PRODUCT_LIBRARY.map((product) => product.collection))]
  .sort()
  .forEach((collection) => collectionSelect.add(new Option(collection, collection)));

collectionSelect.addEventListener("change", () => {
  const products = PRODUCT_LIBRARY.filter(
    (product) => product.collection === collectionSelect.value,
  );
  setOptions(productSelect, products.length ? "Select a product" : "No products available", products);
  productSelect.disabled = products.length === 0;
  resetProductDisplay();
});

productSelect.addEventListener("change", () => {
  const product = PRODUCT_LIBRARY.find((item) => item.productId === productSelect.value);
  if (product) {
    showProduct(product);
  } else {
    resetProductDisplay();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const product = selectedProduct;

  outputs.title.textContent = `${product.name} ${product.productType} — ${product.style} Living`;
  outputs.description.textContent =
    `Meet ${product.name} ${product.number}, a ${product.style.toLowerCase()} ${product.productType.toLowerCase()} designed for ${data.targetAudience.toLowerCase()}. ` +
    `Finished in ${product.primaryColor.toLowerCase()} with ${product.secondaryColor.toLowerCase()} details, it brings a considered presence to ${data.scene.toLowerCase()}.`;
  outputs.keywords.textContent = [
    product.productType,
    product.style,
    product.primaryColor,
    product.secondaryColor,
    "interior inspiration",
    "MORGUNMVON",
  ].join(" · ");
  outputs.prompt.textContent =
    `Editorial interior photograph of the MORGUNMVON ${product.name} ${product.productType}, product ID ${product.productId}. ` +
    `${data.scene}. Focus on a ${product.primaryColor} palette with ${product.secondaryColor} accents. ` +
    `Quiet ${product.style.toLowerCase()} styling, natural light, refined composition, tactile materials, generous negative space, premium design magazine aesthetic.`;

  Object.values(outputs).forEach((output) => {
    output.classList.remove("placeholder-copy");
  });

  document.querySelector("#content-heading").scrollIntoView({ behavior: "smooth" });
});
