// Dữ liệu sản phẩm mẫu cho ShopViet
const CATEGORIES = [
  { id: "all", name: "Tất cả" },
  { id: "thoi-trang-nam", name: "Thời trang nam" },
  { id: "thoi-trang-nu", name: "Thời trang nữ" },
  { id: "dien-tu", name: "Điện tử" },
  { id: "gia-dung", name: "Gia dụng" },
  { id: "lam-dep", name: "Làm đẹp" },
  { id: "giay-dep", name: "Giày dép" },
];

const PRODUCTS = [
  { id: 1, name: "Áo sơ mi nam tay dài công sở", category: "thoi-trang-nam", price: 259000, oldPrice: 399000, icon: "👔", color: "#4f46e5", rating: 4.8, sold: 1200, desc: "Chất liệu vải kate lụa cao cấp, form regular fit, thoáng mát, phù hợp đi làm và dự tiệc." },
  { id: 2, name: "Quần jean nam slimfit", category: "thoi-trang-nam", price: 329000, oldPrice: 450000, icon: "👖", color: "#2563eb", rating: 4.6, sold: 860, desc: "Vải denim co giãn nhẹ, form slimfit tôn dáng, bền màu sau nhiều lần giặt." },
  { id: 3, name: "Váy hoa nữ dáng xòe", category: "thoi-trang-nu", price: 279000, oldPrice: 399000, icon: "👗", color: "#db2777", rating: 4.9, sold: 2100, desc: "Chất liệu voan 2 lớp, họa tiết hoa nhí nữ tính, thích hợp dạo phố và du lịch." },
  { id: 4, name: "Áo khoác kaki nữ form rộng", category: "thoi-trang-nu", price: 349000, oldPrice: 499000, icon: "🧥", color: "#c026d3", rating: 4.7, sold: 640, desc: "Vải kaki dày dặn, form rộng basic dễ phối đồ, chống nắng nhẹ." },
  { id: 5, name: "Tai nghe không dây Bluetooth 5.3", category: "dien-tu", price: 399000, oldPrice: 690000, icon: "🎧", color: "#0891b2", rating: 4.7, sold: 3400, desc: "Chống ồn chủ động, pin 30 giờ, chống nước IPX5, kết nối ổn định." },
  { id: 6, name: "Loa bluetooth mini di động", category: "dien-tu", price: 259000, oldPrice: 350000, icon: "🔊", color: "#0e7490", rating: 4.5, sold: 980, desc: "Âm thanh mạnh mẽ, pin 12 giờ, thiết kế nhỏ gọn tiện mang theo." },
  { id: 7, name: "Sạc dự phòng 20.000mAh", category: "dien-tu", price: 329000, oldPrice: 490000, icon: "🔋", color: "#155e75", rating: 4.8, sold: 1560, desc: "Sạc nhanh 22.5W, hỗ trợ 3 thiết bị cùng lúc, an toàn pin Lithium-polymer." },
  { id: 8, name: "Nồi chiên không dầu 5.5L", category: "gia-dung", price: 899000, oldPrice: 1290000, icon: "🍳", color: "#ea580c", rating: 4.9, sold: 4200, desc: "Dung tích lớn cho gia đình 4-6 người, tiết kiệm điện, dễ vệ sinh." },
  { id: 9, name: "Máy xay sinh tố đa năng", category: "gia-dung", price: 459000, oldPrice: 650000, icon: "🥤", color: "#f97316", rating: 4.6, sold: 890, desc: "Công suất 600W, lưỡi dao thép không gỉ, xay nhuyễn mịn mọi loại rau củ quả." },
  { id: 10, name: "Bộ chăn ga gối cotton 4 món", category: "gia-dung", price: 549000, oldPrice: 799000, icon: "🛏️", color: "#d97706", rating: 4.7, sold: 720, desc: "Chất liệu cotton thoáng mát, thấm hút mồ hôi tốt, họa tiết trang nhã." },
  { id: 11, name: "Son kem lì lâu trôi", category: "lam-dep", price: 129000, oldPrice: 189000, icon: "💄", color: "#e11d48", rating: 4.8, sold: 5600, desc: "Bảng màu đa dạng, chất son mịn nhẹ môi, lâu trôi lên đến 8 giờ." },
  { id: 12, name: "Serum dưỡng da vitamin C", category: "lam-dep", price: 219000, oldPrice: 320000, icon: "🧴", color: "#be123c", rating: 4.7, sold: 2300, desc: "Làm sáng da, mờ thâm nám, cấp ẩm chuyên sâu, phù hợp mọi loại da." },
  { id: 13, name: "Mặt nạ dưỡng ẩm cấp tốc (hộp 10 miếng)", category: "lam-dep", price: 99000, oldPrice: 150000, icon: "🎭", color: "#9f1239", rating: 4.6, sold: 1800, desc: "Tinh chất cô đặc, cấp ẩm tức thì, phù hợp sử dụng hàng ngày." },
  { id: 14, name: "Giày sneaker unisex năng động", category: "giay-dep", price: 389000, oldPrice: 590000, icon: "👟", color: "#16a34a", rating: 4.8, sold: 3100, desc: "Đế cao su êm ái, form giày thoải mái, phù hợp cả nam và nữ." },
  { id: 15, name: "Dép sandal nữ quai ngang", category: "giay-dep", price: 159000, oldPrice: 249000, icon: "🩴", color: "#15803d", rating: 4.5, sold: 1400, desc: "Chất liệu da PU mềm mại, đế êm chống trơn trượt." },
  { id: 16, name: "Đồng hồ thông minh thể thao", category: "dien-tu", price: 549000, oldPrice: 890000, icon: "⌚", color: "#0369a1", rating: 4.7, sold: 2600, desc: "Đo nhịp tim, theo dõi giấc ngủ, chống nước, pin dùng 7 ngày." },
];

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}
