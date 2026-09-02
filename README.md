# ShopViệt - Trang web bán hàng

Website bán hàng trực tuyến demo, xây dựng bằng HTML/CSS/JavaScript thuần (không cần build tool, không cần cài đặt gì thêm).

## Tính năng

- Trang chủ hiển thị danh mục, sản phẩm Flash Sale kèm đồng hồ đếm ngược, lưới sản phẩm có thể lọc theo danh mục và tìm kiếm theo tên.
- Trang chi tiết sản phẩm: mô tả, giá, chọn số lượng, thêm vào giỏ hoặc mua ngay, gợi ý sản phẩm liên quan.
- Giỏ hàng: tăng/giảm số lượng, xóa sản phẩm, tự tính phí vận chuyển (miễn phí từ 299.000₫).
- Thanh toán: form thông tin giao hàng, chọn phương thức thanh toán (COD/chuyển khoản/MoMo), xác nhận đơn hàng với mã đơn tự sinh.
- Giỏ hàng được lưu trong `localStorage` nên vẫn còn khi tải lại trang hoặc chuyển trang.
- Giao diện responsive, dùng được trên điện thoại.

## Cấu trúc thư mục

```
index.html        Trang chủ
product.html       Trang chi tiết sản phẩm (?id=<id>)
cart.html          Trang giỏ hàng
checkout.html      Trang thanh toán
css/style.css      Toàn bộ style
js/products.js     Dữ liệu sản phẩm mẫu
js/cart.js         Logic giỏ hàng dùng chung (localStorage)
js/main.js         Logic trang chủ
js/product.js      Logic trang chi tiết sản phẩm
js/cart-page.js    Logic trang giỏ hàng
js/checkout.js     Logic trang thanh toán
```

## Chạy thử

Chỉ cần mở `index.html` bằng trình duyệt, hoặc chạy một server tĩnh đơn giản:

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## Tùy chỉnh

- Sửa/thêm sản phẩm trong `js/products.js` (danh mục khai báo ở `CATEGORIES`, sản phẩm ở `PRODUCTS`).
- Đây là bản demo tĩnh: đơn hàng không được gửi lên server thật, phần thanh toán chỉ mô phỏng luồng đặt hàng. Muốn dùng thật cần nối với backend/cổng thanh toán.
