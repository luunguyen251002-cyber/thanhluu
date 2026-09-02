// Logic cho trang chi tiết sản phẩm
function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id")) || PRODUCTS[0].id;
}

function renderProductDetail() {
  const id = getQueryId();
  const p = getProductById(id);
  const wrap = document.getElementById("productDetailWrap");
  const crumb = document.getElementById("breadcrumb");
  if (!p) {
    wrap.innerHTML = `<div class="empty-state"><div class="icon">😢</div><p>Không tìm thấy sản phẩm.</p></div>`;
    return;
  }
  const catName = CATEGORIES.find((c) => c.id === p.category)?.name || "";
  crumb.innerHTML = `<a href="index.html">Trang chủ</a> / ${catName} / ${p.name}`;

  wrap.innerHTML = `
    <div class="product-detail">
      <div class="detail-thumb" style="background:${p.color}">${p.icon}</div>
      <div class="detail-info">
        <h1>${p.name}</h1>
        <div class="detail-meta">
          <span>⭐ ${p.rating}</span>
          <span>Đã bán ${p.sold}</span>
          <span>Danh mục: ${catName}</span>
        </div>
        <div class="detail-price-box">
          <span class="detail-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="detail-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <p class="detail-desc">${p.desc}</p>
        <div class="qty-selector">
          <button type="button" id="qtyMinus">-</button>
          <input type="number" id="qtyInput" value="1" min="1">
          <button type="button" id="qtyPlus">+</button>
        </div>
        <div class="detail-actions">
          <button class="btn btn-outline" id="addCartBtn">🛒 Thêm vào giỏ</button>
          <a href="#" class="btn btn-primary" id="buyNowBtn">Mua ngay</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("qtyMinus").addEventListener("click", () => {
    const input = document.getElementById("qtyInput");
    input.value = Math.max(1, Number(input.value) - 1);
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    const input = document.getElementById("qtyInput");
    input.value = Number(input.value) + 1;
  });
  document.getElementById("addCartBtn").addEventListener("click", () => {
    const qty = Number(document.getElementById("qtyInput").value) || 1;
    addToCart(p.id, qty);
    document.getElementById("addCartBtn").textContent = "Đã thêm vào giỏ ✓";
    setTimeout(() => (document.getElementById("addCartBtn").textContent = "🛒 Thêm vào giỏ"), 1200);
  });
  document.getElementById("buyNowBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const qty = Number(document.getElementById("qtyInput").value) || 1;
    addToCart(p.id, qty);
    window.location.href = "checkout.html";
  });

  renderRelated(p);
}

function renderRelated(current) {
  const grid = document.getElementById("relatedGrid");
  const related = PRODUCTS.filter((p) => p.category === current.category && p.id !== current.id).slice(0, 4);
  grid.innerHTML = related.map(productCardHtmlSimple).join("");
  grid.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(Number(btn.dataset.id), 1);
      btn.textContent = "Đã thêm ✓";
      setTimeout(() => (btn.textContent = "Thêm vào giỏ"), 1200);
    });
  });
}

function productCardHtmlSimple(p) {
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
      <button class="add-cart-btn" data-id="${p.id}">Thêm vào giỏ</button>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
