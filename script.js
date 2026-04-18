const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const page = document.body.dataset.page;

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const navMap = {
  home: "index.html",
  shop: "shop.html",
  science: "science.html",
  ingredients: "ingredients.html",
  faq: "faq.html",
};

document.querySelectorAll(".main-nav a, .mobile-nav a").forEach((link) => {
  if (page && link.getAttribute("href") === navMap[page]) {
    link.setAttribute("aria-current", "page");
  }
});

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const checkoutParams = new URLSearchParams(window.location.search);
const queryQty = Number.parseInt(checkoutParams.get("qty") || "1", 10);

document.querySelectorAll("[data-price]").forEach((block) => {
  const unitPrice = Number.parseInt(block.dataset.price || "1150", 10);
  let qty = Number.isFinite(queryQty) && queryQty > 0 ? queryQty : 1;

  const qtyValue = block.querySelector("[data-qty-value]");
  const totalDisplay = block.querySelector("[data-total-display]");
  const buyNowLink = block.querySelector("[data-buy-now]");
  const addToCartLink = block.querySelector("[data-add-to-cart]");
  const orderEmailLink = block.querySelector("[data-order-email]");

  const render = () => {
    const total = unitPrice * qty;
    if (qtyValue) qtyValue.textContent = String(qty);
    if (totalDisplay) totalDisplay.textContent = rupees.format(total);
    if (buyNowLink) buyNowLink.setAttribute("href", `checkout.html?qty=${qty}`);
    if (addToCartLink) addToCartLink.setAttribute("href", `checkout.html?qty=${qty}`);
    if (orderEmailLink) {
      const message = `I would like to order SOHE Luxury Toothpaste.%0D%0AQuantity: ${qty}%0D%0ATotal: ${rupees
        .format(total)
        .replace("₹", "INR ")}`;
      orderEmailLink.setAttribute(
        "href",
        `mailto:hello@sohecare.com?subject=SOHE%20Order%20Request&body=${message}`
      );
    }
  };

  block.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      qty = action === "increase" ? qty + 1 : Math.max(1, qty - 1);
      render();
    });
  });

  render();
});
