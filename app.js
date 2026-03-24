const LINK_CONFIG = {
  joinAdventure: "#waitlist",
  openApp: "#",
  goCalculator: "#calculateur-ia",
  waitlistSubmit: "#",
  iosStore: "#",
  androidStore: "#",
  apkDirect: "#"
};

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  }).format(value);
}

function computeSubscriptionPrice(clientes) {
  const base = 29.99;
  const variable = (clientes - 50) * 0.18;
  const result = base + variable;
  return Math.max(19.99, Math.min(89.99, result));
}

function setupSubscriptionCalculator() {
  const trigger = document.getElementById("calculer-tarif-btn");
  const box = document.getElementById("pricing-calculator");
  const slider = document.getElementById("clientes-slider");
  const clientesOutput = document.getElementById("clientes-value");
  const priceOutput = document.getElementById("abonnement-price");
  if (!slider || !clientesOutput || !priceOutput) return;

  function update() {
    const clientes = Number(slider.value);
    const price = computeSubscriptionPrice(clientes);
    clientesOutput.textContent = String(clientes);
    priceOutput.textContent = formatEuro(price).replace(" €", "€");
  }

  if (trigger && box) {
    trigger.addEventListener("click", () => {
      box.classList.add("active");
      slider.focus();
    });
  }
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
      if (href === "#waitlist" || href === "#calculateur-ia") return;
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
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("waitlist-status");
    if (status) {
      status.textContent =
        "Préinscription enregistrée localement (mode test). Connexion email à activer.";
    }
    form.reset();
  });
}

function setupEstimateCta() {
  const cta = document.getElementById("estimate-cta");
  const target = document.getElementById("calculateur-ia");
  if (!cta || !target) return;

  cta.addEventListener("click", (event) => {
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.classList.add("focus-card");
    window.setTimeout(() => target.classList.remove("focus-card"), 1200);
  });
}

setupSubscriptionCalculator();
setupCtaPlaceholders();
setupWaitlistForm();
setupEstimateCta();
