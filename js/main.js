// Logic cho trang chủ: render danh mục, flash sale, lưới sản phẩm, bộ lọc, tìm kiếm
let currentCategory = "all";
let searchTerm = "";

function renderCategoryNav() {
  const nav = document.getElementById("categoryNav");
  if (!nav) return;
  nav.innerHTML = CATEGORIES.filter((c) => c.id !== "all")
    .map((c) => `<a href="#" data-cat="${c.id}">${c.name}</a>`)
    .join("");
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentCategory = a.dataset.cat;
      document.getElementById(`tab-${currentCategory}`)?.scrollIntoView();
      setActiveTab(currentCategory);
      renderProductGrid();
      document.getElementById("productGrid").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderFilterTabs() {
  const wrap = document.getElementById("filterTabs");
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(
    (c) => `<button id="tab-${c.id}" data-cat="${c.id}" class="${c.id === currentCategory ? "active" : ""}">${c.name}</button>`
  ).join("");
  wrap.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      setActiveTab(currentCategory);
      renderProductGrid();
    });
  });
}

function setActiveTab(catId) {
  document.querySelectorAll(".filter-tabs button").forEach((b) => {
    b.classList.toggle("active", b.dataset.cat === catId);
  });
}

function productCardHtml(p) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <div class="product-card">
    <a href="product.html?id=${p.id}">
      <div class="product-thumb" style="background:${p.color}">
        ${p.icon}
        ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
      </div>
    </a>
    <div class="product-info">
      <a href="product.html?id=${p.id}"><div class="product-name">${p.name}</div></a>
      <div>
        <span class="product-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="product-meta"><span>⭐ ${p.rating}</span><span>Đã bán ${p.sold}</span></div>
      <button class="add-cart-btn" data-id="${p.id}">Thêm vào giỏ</button>
    </div>
  </div>`;
}

function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  let list = PRODUCTS;
  if (currentCategory !== "all") list = list.filter((p) => p.category === currentCategory);
  if (searchTerm) {
    const s = searchTerm.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(s));
  }
  grid.innerHTML = list.length
    ? list.map(productCardHtml).join("")
    : `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><p>Không tìm thấy sản phẩm phù hợp.</p></div>`;
  bindAddToCartButtons(grid);
}

function renderFlashSale() {
  const wrap = document.getElementById("flashScroll");
  if (!wrap) return;
  const flash = PRODUCTS.filter((p) => p.oldPrice).slice(0, 8);
  wrap.innerHTML = flash.map(productCardHtml).join("");
  bindAddToCartButtons(wrap);
}

function bindAddToCartButtons(scope) {
  scope.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(Number(btn.dataset.id), 1);
      btn.textContent = "Đã thêm ✓";
      setTimeout(() => (btn.textContent = "Thêm vào giỏ"), 1200);
    });
  });
}

function startCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;
  let end = Date.now() + 1000 * 60 * 60 * 3; // đếm ngược 3 tiếng
  function tick() {
    let diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    el.innerHTML = `<b>${h}</b>:<b>${m}</b>:<b>${s}</b>`;
    if (diff <= 0) end = Date.now() + 1000 * 60 * 60 * 3;
  }
  tick();
  setInterval(tick, 1000);
}

function bindSearch() {
  const form = document.getElementById("searchForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTerm = document.getElementById("searchInput").value.trim();
    currentCategory = "all";
    setActiveTab("all");
    renderProductGrid();
    document.getElementById("productGrid").scrollIntoView({ behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryNav();
  renderFilterTabs();
  renderProductGrid();
  renderFlashSale();
  startCountdown();
  bindSearch();
});
