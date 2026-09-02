// Logic cho trang thanh toán (demo, không kết nối cổng thanh toán thật)
function renderCheckoutPage() {
  const wrap = document.getElementById("checkoutWrap");
  const items = getCartDetails();

  if (!items.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <p style="margin-bottom:16px">Giỏ hàng trống, không có gì để thanh toán.</p>
        <a href="index.html" class="btn btn-primary">Về trang chủ mua sắm</a>
      </div>`;
    return;
  }

  const shipping = getCartTotalPrice() >= 299000 ? 0 : 20000;
  const total = getCartTotalPrice() + shipping;

  wrap.innerHTML = `
    <form id="checkoutForm" class="checkout-grid">
      <div class="section-card">
        <div class="section-header"><h2>Thông tin giao hàng</h2></div>
        <div class="form-group">
          <label>Họ và tên *</label>
          <input type="text" name="fullname" required placeholder="Nguyễn Văn A">
        </div>
        <div class="form-group">
          <label>Số điện thoại *</label>
          <input type="tel" name="phone" required pattern="[0-9]{9,11}" placeholder="09xxxxxxxx">
        </div>
        <div class="form-group">
          <label>Địa chỉ nhận hàng *</label>
          <textarea name="address" required rows="3" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"></textarea>
        </div>
        <div class="form-group">
          <label>Ghi chú đơn hàng</label>
          <textarea name="note" rows="2" placeholder="Ví dụ: giao giờ hành chính"></textarea>
        </div>
        <div class="section-header"><h2>Phương thức thanh toán</h2></div>
        <div class="payment-options" id="paymentOptions">
          <label class="payment-option active"><input type="radio" name="payment" value="cod" checked> 💵 Thanh toán khi nhận hàng (COD)</label>
          <label class="payment-option"><input type="radio" name="payment" value="bank"> 🏦 Chuyển khoản ngân hàng</label>
          <label class="payment-option"><input type="radio" name="payment" value="momo"> 📱 Ví MoMo</label>
        </div>
      </div>

      <div class="section-card">
        <div class="section-header"><h2>Đơn hàng của bạn</h2></div>
        <div class="order-summary-list">
          ${items
            .map(
              (i) => `<div class="order-summary-item"><span>${i.name} × ${i.qty}</span><span>${formatPrice(i.lineTotal)}</span></div>`
            )
            .join("")}
        </div>
        <div class="cart-summary-row"><span>Tạm tính</span><span>${formatPrice(getCartTotalPrice())}</span></div>
        <div class="cart-summary-row"><span>Phí vận chuyển</span><span>${shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span></div>
        <div class="cart-summary-row cart-summary-total"><span>Tổng cộng</span><span>${formatPrice(total)}</span></div>
        <button type="submit" class="btn btn-primary" style="width:100%;margin-top:16px">Đặt hàng</button>
        <a href="cart.html" class="btn btn-outline" style="display:block;text-align:center;margin-top:8px">Quay lại giỏ hàng</a>
      </div>
    </form>
  `;

  wrap.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      wrap.querySelectorAll(".payment-option").forEach((el) => el.classList.remove("active"));
      radio.closest(".payment-option").classList.add("active");
    });
  });

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const orderCode = "SV" + Date.now().toString().slice(-8);
    clearCart();
    wrap.innerHTML = `
      <div class="success-box">
        <div class="icon">✅</div>
        <h2 style="margin-bottom:10px">Đặt hàng thành công!</h2>
        <p style="margin-bottom:8px">Mã đơn hàng của bạn: <span class="order-code">${orderCode}</span></p>
        <p style="color:var(--text-light);margin-bottom:24px">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất. Cảm ơn bạn đã mua sắm tại ShopViệt!</p>
        <a href="index.html" class="btn btn-primary">Tiếp tục mua sắm</a>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderCheckoutPage);
