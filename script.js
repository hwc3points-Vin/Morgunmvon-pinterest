const form = document.querySelector("#content-form");

const outputs = {
  title: document.querySelector("#output-title"),
  description: document.querySelector("#output-description"),
  keywords: document.querySelector("#output-keywords"),
  prompt: document.querySelector("#output-prompt"),
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  outputs.title.textContent = `${data.productName} ${data.productType} — ${data.style} Living`;
  outputs.description.textContent =
    `Meet ${data.productName} ${data.productNumber}, a ${data.style.toLowerCase()} ${data.productType.toLowerCase()} designed for ${data.targetAudience.toLowerCase()}. ` +
    `Finished in ${data.primaryColor.toLowerCase()} with ${data.secondaryColor.toLowerCase()} details, it brings a considered presence to ${data.scene.toLowerCase()}.`;
  outputs.keywords.textContent = [
    data.productType,
    data.style,
    data.primaryColor,
    data.secondaryColor,
    "interior inspiration",
    "MORGUNMVON",
  ].join(" · ");
  outputs.prompt.textContent =
    `Editorial interior photograph of the MORGUNMVON ${data.productName} ${data.productType}, product ID ${data.productId}. ` +
    `${data.scene}. Focus on a ${data.primaryColor} palette with ${data.secondaryColor} accents. ` +
    `Quiet ${data.style.toLowerCase()} styling, natural light, refined composition, tactile materials, generous negative space, premium design magazine aesthetic.`;

  Object.values(outputs).forEach((output) => {
    output.classList.remove("placeholder-copy");
  });

  document.querySelector("#content-heading").scrollIntoView({ behavior: "smooth" });
});
