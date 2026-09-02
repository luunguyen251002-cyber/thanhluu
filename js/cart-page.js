// Logic cho trang giỏ hàng
function renderCartPage() {
  const wrap = document.getElementById("cartWrap");
  const items = getCartDetails();

  if (!items.length) {
    wrap.innerHTML = `
      <div class="empty">
        ${iconSvg("empty", 48)}
        <p>Giỏ hàng của bạn đang trống.</p>
        <a href="index.html" class="btn btn-primary">Tiếp tục mua sắm</a>
      </div>`;
    return;
  }

  const shipping = getCartTotalPrice() >= 299000 ? 0 : 20000;

  const rows = items
    .map((i) => {
      const cat = getCategoryById(i.category);
      return `
    <tr>
      <td>
        <div class="cart-prod">
          <div class="mini-media">${iconSvg(cat.icon, 26)}</div>
          <a href="product.html?id=${i.id}">${i.name}</a>
        </div>
      </td>
      <td class="mono">${formatPrice(i.price)}</td>
      <td>
        <div class="stepper">
          <button data-minus="${i.id}">−</button>
          <input class="mono" type="number" min="1" value="${i.qty}" data-qty="${i.id}">
          <button data-plus="${i.id}">+</button>
        </div>
      </td>
      <td class="mono">${formatPrice(i.lineTotal)}</td>
      <td><button class="link-btn" data-remove="${i.id}">Xóa</button></td>
    </tr>`;
    })
    .join("");

  wrap.innerHTML = `
    <div class="block-head"><h2>Giỏ hàng của bạn</h2><span class="count">${items.length} sản phẩm</span></div>
    <div class="cart-layout">
      <div style="overflow-x:auto">
        <table class="cart-table">
          <thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="receipt">
        <h3>Tóm tắt đơn hàng</h3>
        <div class="sum-row"><span>Tạm tính</span><span class="mono">${formatPrice(getCartTotalPrice())}</span></div>
        <div class="sum-row"><span>Vận chuyển</span><span class="mono">${shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span></div>
        <div class="sum-row total"><span>Tổng cộng</span><span>${formatPrice(getCartTotalPrice() + shipping)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:16px">Tiến hành thanh toán</a>
        <a href="index.html" class="btn btn-ghost btn-block" style="margin-top:8px">Tiếp tục mua sắm</a>
      </div>
    </div>
  `;

  wrap.querySelectorAll("[data-plus]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.plus);
      const item = getCartDetails().find((i) => i.id === id);
      updateCartQty(id, item.qty + 1);
      renderCartPage();
    })
  );
  wrap.querySelectorAll("[data-minus]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.minus);
      const item = getCartDetails().find((i) => i.id === id);
      updateCartQty(id, item.qty - 1);
      renderCartPage();
    })
  );
  wrap.querySelectorAll("[data-qty]").forEach((input) =>
    input.addEventListener("change", () => {
      updateCartQty(Number(input.dataset.qty), Math.max(1, Number(input.value) || 1));
      renderCartPage();
    })
  );
  wrap.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.remove));
      renderCartPage();
    })
  );
}

document.addEventListener("DOMContentLoaded", renderCartPage);
