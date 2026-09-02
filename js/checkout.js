// Logic cho trang thanh toán (demo, không kết nối cổng thanh toán thật)
function renderCheckoutPage() {
  const wrap = document.getElementById("checkoutWrap");
  const items = getCartDetails();

  if (!items.length) {
    wrap.innerHTML = `
      <div class="empty">
        ${iconSvg("empty", 48)}
        <p>Giỏ hàng trống, chưa có gì để thanh toán.</p>
        <a href="index.html" class="btn btn-primary">Về trang chủ mua sắm</a>
      </div>`;
    return;
  }

  const shipping = getCartTotalPrice() >= 299000 ? 0 : 20000;
  const total = getCartTotalPrice() + shipping;

  wrap.innerHTML = `
    <div class="block-head"><h2>Thanh toán đơn hàng</h2></div>
    <form id="checkoutForm" class="cart-layout">
      <div>
        <div class="form-group"><label>Họ và tên</label><input type="text" name="fullname" required placeholder="Nguyễn Văn A"></div>
        <div class="form-group"><label>Số điện thoại</label><input type="tel" name="phone" required pattern="[0-9]{9,11}" placeholder="09xxxxxxxx"></div>
        <div class="form-group"><label>Địa chỉ giao hàng</label><textarea name="address" rows="3" required placeholder="Số nhà, đường, phường/xã, quận/huyện"></textarea></div>
        <div class="form-group" style="margin-top:22px"><label>Phương thức thanh toán</label>
          <div class="pay-opts" id="payOpts">
            <label class="pay-opt active">${iconSvg("cash", 18)}<input type="radio" name="pay" value="cod" checked style="display:none">Thanh toán khi nhận hàng (COD)</label>
            <label class="pay-opt">${iconSvg("bank", 18)}<input type="radio" name="pay" value="bank" style="display:none">Chuyển khoản ngân hàng</label>
            <label class="pay-opt">${iconSvg("wallet", 18)}<input type="radio" name="pay" value="momo" style="display:none">Ví MoMo</label>
          </div>
        </div>
      </div>
      <div class="receipt">
        <h3>Đơn hàng của bạn</h3>
        <div class="receipt-list">
          ${items.map((i) => `<div class="receipt-row"><span>${i.name} ×${i.qty}</span><span>${formatPrice(i.lineTotal)}</span></div>`).join("")}
        </div>
        <div class="sum-row"><span>Tạm tính</span><span class="mono">${formatPrice(getCartTotalPrice())}</span></div>
        <div class="sum-row"><span>Vận chuyển</span><span class="mono">${shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span></div>
        <div class="sum-row total"><span>Tổng cộng</span><span>${formatPrice(total)}</span></div>
        <button type="submit" class="btn btn-primary btn-block" style="margin-top:16px">Đặt hàng</button>
        <a href="cart.html" class="btn btn-ghost btn-block" style="margin-top:8px">Quay lại giỏ hàng</a>
      </div>
    </form>
  `;

  wrap.querySelectorAll('input[name="pay"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      wrap.querySelectorAll(".pay-opt").forEach((el) => el.classList.remove("active"));
      radio.closest(".pay-opt").classList.add("active");
    });
  });

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const orderCode = "MN" + Date.now().toString().slice(-8);
    clearCart();
    wrap.innerHTML = `
      <div class="success">
        ${iconSvg("check", 56)}
        <h2 style="margin-bottom:10px">Đặt hàng thành công!</h2>
        <p style="color:var(--text-muted);margin-bottom:6px">Mã đơn hàng của bạn</p>
        <p class="order-code">${orderCode}</p>
        <p style="color:var(--text-muted);margin:14px 0 24px">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất. Cảm ơn bạn đã mua sắm tại MANLY!</p>
        <a href="index.html" class="btn btn-primary">Tiếp tục mua sắm</a>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderCheckoutPage);
