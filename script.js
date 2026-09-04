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
  ["Collection", "collection"],
  ["Product Type", "productType"],
  ["Design ID", "designId"],
  ["Primary Color", "primaryColor"],
  ["Secondary Color", "secondaryColor"],
  ["Material", "material"],
  ["Shape", "shape"],
  ["Print Type", "printType"],
  ["Customization Type", "customizationType"],
  ["Available Sizes", "availableSizes"],
];

function setOptions(select, placeholder, products) {
  select.replaceChildren(new Option(placeholder, ""));
  products.forEach((product) => {
    select.add(new Option(product.productId, product.productId));
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
    image.alt = `${product.productType}, design ${product.designId}`;
    previewFrame.replaceChildren(image);
  } else {
    previewFrame.innerHTML = `<span class="preview-mark" aria-hidden="true">M</span><p>${product.productId}<br>Image coming soon</p>`;
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

  outputs.title.textContent = `${data.customName} ${data.customNumber} Personalized Football Pillow`;
  outputs.description.textContent =
    `Make it personal with the name ${data.customName} and number ${data.customNumber}. ` +
    `This ${product.shape.toLowerCase()} ${product.productType.toLowerCase()} from the ${product.collection} collection is made from ${product.material.toLowerCase()} with a ${product.printType.toLowerCase()}, designed for ${data.targetAudience.toLowerCase()}. ` +
    `Design ${product.designId} brings a personal touch to ${data.scene.toLowerCase()}.`;
  outputs.keywords.textContent = [
    product.productType,
    product.collection,
    product.material,
    product.customizationType,
    `custom ${data.customName}`,
    `number ${data.customNumber}`,
    "MORGUNMVON",
  ].join(" · ");
  outputs.prompt.textContent =
    `Editorial product photograph of a MORGUNMVON ${product.shape.toLowerCase()} ${product.productType.toLowerCase()}, product ID ${product.productId}, design ID ${product.designId}. ` +
    `Show the custom name “${data.customName}” and custom number “${data.customNumber}” clearly on the ${product.printType.toLowerCase()} ${product.material.toLowerCase()} cover. ` +
    `${data.scene}. Refined composition, tactile detail, generous negative space, premium design magazine aesthetic.`;

  Object.values(outputs).forEach((output) => {
    output.classList.remove("placeholder-copy");
  });

  document.querySelector("#content-heading").scrollIntoView({ behavior: "smooth" });
});
