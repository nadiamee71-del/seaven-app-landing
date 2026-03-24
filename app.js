const LINK_CONFIG = {
  preinscription: "#waitlist",
  iosStore: "#",
  androidStore: "#",
  apkDirect: "#",
  loginApp: "#",
  openApp: "#",
  deepLink: "#"
};

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  }).format(value);
}

function computeSubscriptionPrice(clientes) {
  const base = 19.99;
  const variable = clientes * 0.42;
  return Math.min(99.99, base + variable);
}

function setupHeroTabs() {
  const tabClient = document.getElementById("tab-client");
  const tabPro = document.getElementById("tab-pro");
  const phoneClient = document.getElementById("phone-client");
  const phonePro = document.getElementById("phone-pro");
  if (!tabClient || !tabPro || !phoneClient || !phonePro) return;

  function activate(view) {
    const isClient = view === "client";
    tabClient.classList.toggle("active", isClient);
    tabPro.classList.toggle("active", !isClient);
    phoneClient.classList.toggle("active", isClient);
    phonePro.classList.toggle("active", !isClient);
  }

  tabClient.addEventListener("click", () => activate("client"));
  tabPro.addEventListener("click", () => activate("pro"));
}

function setupQuickEstimate() {
  const select = document.getElementById("service");
  const priceOutput = document.getElementById("quick-estimate-price");
  if (!select || !priceOutput) return;

  function update() {
    const value = Number(select.value || 0);
    priceOutput.textContent = `Dès ${formatEuro(value)}`;
  }

  select.addEventListener("change", update);
  update();
}

function setupSubscriptionCalculator() {
  const trigger = document.getElementById("calculer-tarif-btn");
  const box = document.getElementById("pricing-calculator");
  const slider = document.getElementById("clientes-slider");
  const clientesOutput = document.getElementById("clientes-value");
  const priceOutput = document.getElementById("abonnement-price");
  if (!trigger || !box || !slider || !clientesOutput || !priceOutput) return;

  function update() {
    const clientes = Number(slider.value);
    const price = computeSubscriptionPrice(clientes);
    clientesOutput.textContent = String(clientes);
    priceOutput.textContent = `${formatEuro(price)} / mois`;
  }

  trigger.addEventListener("click", () => {
    box.classList.add("active");
    slider.focus();
  });
  slider.addEventListener("input", update);
  update();
}

function setupCtaPlaceholders() {
  const ctas = document.querySelectorAll("[data-cta-key]");
  ctas.forEach((el) => {
    const key = el.getAttribute("data-cta-key");
    const href = LINK_CONFIG[key] || "#";

    if (el.tagName.toLowerCase() === "a") {
      el.setAttribute("href", href);
    }

    el.addEventListener("click", (event) => {
      if (href === "#") {
        event.preventDefault();
        const status = document.getElementById("waitlist-status");
        if (status) {
          status.textContent =
            "Ce bouton sera relié à l'application dès réception des liens officiels.";
        }
      }
    });
  });
}

function setupWaitlistForm() {
  const form = document.getElementById("waitlist-form");
  const input = document.getElementById("waitlist-email");
  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("waitlist-status");
    if (!input.value.trim()) return;
    if (status) {
      status.textContent =
        "Préinscription enregistrée localement (mode test). Connexion email à activer.";
    }
    form.reset();
  });
}

setupHeroTabs();
setupQuickEstimate();
setupSubscriptionCalculator();
setupCtaPlaceholders();
setupWaitlistForm();
