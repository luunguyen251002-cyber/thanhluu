// Logic cho trang chi tiết sản phẩm
function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id")) || PRODUCTS[0].id;
}

function cardHtmlSimple(p) {
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

function renderProductDetail() {
  const id = getQueryId();
  const p = getProductById(id);
  const wrap = document.getElementById("productDetailWrap");
  const crumb = document.getElementById("breadcrumb");

  if (!p) {
    wrap.innerHTML = `<div class="empty">${iconSvg("empty", 44)}<p>Không tìm thấy sản phẩm.</p><a href="index.html" class="btn btn-primary">Về trang chủ</a></div>`;
    return;
  }
  const cat = getCategoryById(p.category);
  crumb.innerHTML = `<a href="index.html">Trang chủ</a> / ${cat.name} / ${p.sku}`;

  wrap.innerHTML = `
    <div class="detail">
      <div class="detail-media">${iconSvg(cat.icon, 120)}</div>
      <div class="detail-info">
        <h1>${p.name}</h1>
        <div class="detail-meta">
          <span>★ ${p.rating}</span><span>Đã bán ${p.sold}</span><span>Mã: ${p.sku}</span>
        </div>
        <div class="price-box">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <p class="detail-desc">${p.desc}</p>
        <div class="qty">
          <button type="button" id="qtyMinus">−</button>
          <input type="number" id="qtyInput" value="1" min="1">
          <button type="button" id="qtyPlus">+</button>
        </div>
        <div class="detail-actions">
          <button class="btn btn-ghost" id="addCartBtn">${iconSvg("cart", 16)} Thêm vào giỏ</button>
          <a href="checkout.html" class="btn btn-primary" id="buyNowBtn">Mua ngay</a>
        </div>
      </div>
    </div>
  `;

  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qtyInput.value = Number(qtyInput.value) + 1;
  });
  document.getElementById("addCartBtn").addEventListener("click", () => {
    addToCart(p.id, Number(qtyInput.value) || 1);
    const btn = document.getElementById("addCartBtn");
    btn.innerHTML = "Đã thêm vào giỏ ✓";
    setTimeout(() => (btn.innerHTML = `${iconSvg("cart", 16)} Thêm vào giỏ`), 1200);
  });
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    addToCart(p.id, Number(qtyInput.value) || 1);
  });

  renderRelated(p);
}

function renderRelated(current) {
  const grid = document.getElementById("relatedGrid");
  const related = PRODUCTS.filter((p) => p.category === current.category && p.id !== current.id).slice(0, 4);
  grid.innerHTML = related.map(cardHtmlSimple).join("");
  bindAddButtons(grid);
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
