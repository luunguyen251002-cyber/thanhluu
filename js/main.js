// Logic cho trang chủ: render danh mục, lưới sản phẩm, lọc theo danh mục và tìm kiếm
let currentCategory = "all";
let searchTerm = "";

function renderCatsRow() {
  const row = document.getElementById("catsRow");
  if (!row) return;
  row.innerHTML = CATEGORIES.map(
    (c) => `<button data-cat="${c.id}" class="${c.id === currentCategory ? "active" : ""}">${c.name}</button>`
  ).join("");
  row.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      renderCatsRow();
      renderProductGrid();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function cardHtml(p) {
  const cat = getCategoryById(p.category);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <div class="card">
    <a href="product.html?id=${p.id}">
      <div class="card-media">
        ${discount > 0 ? `<span class="tag">-${discount}%</span>` : ""}
        ${iconSvg(cat.icon, 56)}
      </div>
    </a>
    <div class="card-body">
      <span class="card-cat">${cat.name}</span>
      <a href="product.html?id=${p.id}"><div class="card-name">${p.name}</div></a>
      <div class="price-row">
        <span class="price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="meta-row"><span>★ ${p.rating}</span><span>Đã bán ${p.sold}</span></div>
      <button class="add-btn" data-add="${p.id}">+ Thêm vào giỏ</button>
    </div>
  </div>`;
}

function bindAddButtons(scope) {
  scope.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(Number(btn.dataset.add), 1);
      const original = btn.textContent;
      btn.textContent = "Đã thêm ✓";
      setTimeout(() => (btn.textContent = original), 1100);
    });
  });
}

function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  const head = document.getElementById("gridTitle");
  const count = document.getElementById("gridCount");
  if (!grid) return;
  let list = PRODUCTS;
  if (currentCategory !== "all") list = list.filter((p) => p.category === currentCategory);
  if (searchTerm) {
    const s = searchTerm.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(s));
  }
  if (head) {
    const catName = currentCategory === "all" ? "Toàn bộ sản phẩm" : getCategoryById(currentCategory).name;
    head.textContent = searchTerm ? `${catName} — tìm "${searchTerm}"` : catName;
  }
  if (count) count.textContent = `${list.length} sản phẩm`;
  grid.innerHTML = list.length
    ? list.map(cardHtml).join("")
    : `<div class="empty" style="grid-column:1/-1">${iconSvg("search", 44)}<p>Không tìm thấy sản phẩm phù hợp.</p></div>`;
  bindAddButtons(grid);
}

function bindSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderProductGrid();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatsRow();
  renderProductGrid();
  bindSearch();
  document.getElementById("heroWatchBtn")?.addEventListener("click", () => {
    currentCategory = "dong-ho-nam";
    renderCatsRow();
    renderProductGrid();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });
});
