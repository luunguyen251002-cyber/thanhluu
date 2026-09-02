// Logic cho trang giỏ hàng
function renderCartPage() {
  const wrap = document.getElementById("cartWrap");
  const items = getCartDetails();

  if (!items.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <p style="margin-bottom:16px">Giỏ hàng của bạn đang trống.</p>
        <a href="index.html" class="btn btn-primary">Tiếp tục mua sắm</a>
      </div>`;
    return;
  }

  const rows = items
    .map(
      (i) => `
    <tr data-id="${i.id}">
      <td>
        <div class="cart-item-info">
          <div class="cart-thumb-mini" style="background:${i.color}">${i.icon}</div>
          <a href="product.html?id=${i.id}">${i.name}</a>
        </div>
      </td>
      <td>${formatPrice(i.price)}</td>
      <td>
        <div class="cart-qty">
          <button class="qty-minus" data-id="${i.id}">-</button>
          <input type="number" min="1" value="${i.qty}" class="qty-input" data-id="${i.id}">
          <button class="qty-plus" data-id="${i.id}">+</button>
        </div>
      </td>
      <td>${formatPrice(i.lineTotal)}</td>
      <td><button class="remove-btn" data-id="${i.id}">Xóa</button></td>
    </tr>`
    )
    .join("");

  wrap.innerHTML = `
    <div style="overflow-x:auto">
      <table class="cart-table">
        <thead>
          <tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="cart-summary">
      <div class="cart-summary-row"><span>Tạm tính</span><span>${formatPrice(getCartTotalPrice())}</span></div>
      <div class="cart-summary-row"><span>Phí vận chuyển</span><span>${getCartTotalPrice() >= 299000 ? "Miễn phí" : formatPrice(20000)}</span></div>
      <div class="cart-summary-row cart-summary-total"><span>Tổng cộng</span><span>${formatPrice(getCartTotalPrice() + (getCartTotalPrice() >= 299000 || getCartTotalPrice() === 0 ? 0 : 20000))}</span></div>
      <a href="checkout.html" class="btn btn-primary" style="display:block;text-align:center;margin-top:12px">Tiến hành thanh toán</a>
      <a href="index.html" class="btn btn-outline" style="display:block;text-align:center;margin-top:8px">Tiếp tục mua sắm</a>
    </div>
  `;

  wrap.querySelectorAll(".qty-plus").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = getCartDetails().find((i) => i.id === id);
      updateCartQty(id, item.qty + 1);
      renderCartPage();
    })
  );
  wrap.querySelectorAll(".qty-minus").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = getCartDetails().find((i) => i.id === id);
      updateCartQty(id, item.qty - 1);
      renderCartPage();
    })
  );
  wrap.querySelectorAll(".qty-input").forEach((input) =>
    input.addEventListener("change", () => {
      const id = Number(input.dataset.id);
      updateCartQty(id, Math.max(1, Number(input.value) || 1));
      renderCartPage();
    })
  );
  wrap.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id));
      renderCartPage();
    })
  );
}

document.addEventListener("DOMContentLoaded", renderCartPage);
