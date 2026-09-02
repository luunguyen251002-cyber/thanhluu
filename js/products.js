// Dữ liệu sản phẩm mẫu cho MANLY - Thời trang & phụ kiện nam
const CATEGORIES = [
  { id: "all", name: "Tất cả", icon: "cart" },
  { id: "ao-nam", name: "Áo nam", icon: "shirt" },
  { id: "quan-nam", name: "Quần nam", icon: "pants" },
  { id: "giay-dep-nam", name: "Giày dép nam", icon: "shoe" },
  { id: "phu-kien-nam", name: "Phụ kiện nam", icon: "belt" },
  { id: "dong-ho-nam", name: "Đồng hồ nam", icon: "watch" },
  { id: "balo-tui-nam", name: "Balo - Túi nam", icon: "bag" },
];

const PRODUCTS = [
  { id: 1, name: "Áo sơ mi nam tay dài công sở", category: "ao-nam", price: 259000, oldPrice: 399000, rating: 4.8, sold: 1200, sku: "MN-SM-001", desc: "Vải kate lụa cao cấp, form regular fit, thoáng mát, hợp đi làm và dự tiệc." },
  { id: 2, name: "Áo thun nam cotton form rộng", category: "ao-nam", price: 149000, oldPrice: 229000, rating: 4.7, sold: 2400, sku: "MN-TS-002", desc: "Cotton 100% mềm mại, thấm hút mồ hôi tốt, form rộng basic dễ phối đồ." },
  { id: 3, name: "Áo polo nam basic", category: "ao-nam", price: 199000, oldPrice: 299000, rating: 4.6, sold: 1560, sku: "MN-PL-003", desc: "Vải cá sấu cao cấp, không xù lông, giữ form sau nhiều lần giặt." },
  { id: 4, name: "Áo khoác bomber nam form rộng", category: "ao-nam", price: 359000, oldPrice: 520000, rating: 4.7, sold: 780, sku: "MN-JK-004", desc: "Chất liệu dù 2 lớp chống nắng, chống gió nhẹ, phong cách năng động." },
  { id: 5, name: "Quần jean nam slimfit", category: "quan-nam", price: 329000, oldPrice: 450000, rating: 4.6, sold: 860, sku: "MN-JN-005", desc: "Denim co giãn nhẹ, form slimfit tôn dáng, bền màu sau nhiều lần giặt." },
  { id: 6, name: "Quần kaki nam ống đứng", category: "quan-nam", price: 279000, oldPrice: 399000, rating: 4.7, sold: 1040, sku: "MN-KK-006", desc: "Kaki dày dặn, form ống đứng lịch lãm, hợp đi làm và đi chơi." },
  { id: 7, name: "Quần short nam thể thao", category: "quan-nam", price: 139000, oldPrice: 199000, rating: 4.5, sold: 1980, sku: "MN-SH-007", desc: "Thun lạnh co giãn 4 chiều, thoáng khí, hợp tập gym và chạy bộ." },
  { id: 8, name: "Quần âu nam công sở", category: "quan-nam", price: 309000, oldPrice: 450000, rating: 4.8, sold: 690, sku: "MN-AU-008", desc: "Vải âu cao cấp không nhăn, form suông chuẩn công sở, lịch lãm." },
  { id: 9, name: "Giày sneaker nam năng động", category: "giay-dep-nam", price: 389000, oldPrice: 590000, rating: 4.8, sold: 3100, sku: "MN-SN-009", desc: "Đế cao su êm ái, form thoải mái, phối được nhiều trang phục." },
  { id: 10, name: "Giày tây nam da bò cao cấp", category: "giay-dep-nam", price: 599000, oldPrice: 890000, rating: 4.9, sold: 540, sku: "MN-OX-010", desc: "Da bò thật cao cấp, đế khâu chắc chắn, hợp công sở và dự tiệc." },
  { id: 11, name: "Dép sandal nam quai ngang", category: "giay-dep-nam", price: 159000, oldPrice: 249000, rating: 4.5, sold: 1400, sku: "MN-SD-011", desc: "Da PU mềm mại, đế êm chống trơn trượt, tiện lợi mùa hè." },
  { id: 12, name: "Giày lười nam da lộn", category: "giay-dep-nam", price: 449000, oldPrice: 650000, rating: 4.6, sold: 620, sku: "MN-LF-012", desc: "Thiết kế tối giản, dễ mang, hợp phong cách smart-casual." },
  { id: 13, name: "Thắt lưng da nam khóa tự động", category: "phu-kien-nam", price: 199000, oldPrice: 320000, rating: 4.7, sold: 1320, sku: "MN-BL-013", desc: "Da bò thật, khóa hợp kim chống gỉ, thiết kế sang trọng." },
  { id: 14, name: "Ví da nam ngắn cao cấp", category: "phu-kien-nam", price: 229000, oldPrice: 350000, rating: 4.8, sold: 980, sku: "MN-WL-014", desc: "Nhiều ngăn đựng thẻ và tiền, da PU cao cấp bền đẹp theo thời gian." },
  { id: 15, name: "Kính mát nam phân cực chống UV", category: "phu-kien-nam", price: 179000, oldPrice: 280000, rating: 4.6, sold: 860, sku: "MN-SG-015", desc: "Tròng phân cực chống chói, chống tia UV, gọng nhẹ bền chắc." },
  { id: 16, name: "Mũ lưỡi trai nam thể thao", category: "phu-kien-nam", price: 99000, oldPrice: 159000, rating: 4.5, sold: 2100, sku: "MN-CP-016", desc: "Kaki thoáng mát, dây điều chỉnh size linh hoạt." },
  { id: 17, name: "Đồng hồ nam dây da cổ điển", category: "dong-ho-nam", price: 459000, oldPrice: 690000, rating: 4.8, sold: 1150, sku: "MN-WT-017", desc: "Mặt kính chống trầy, dây da thật, thiết kế lịch lãm cho quý ông." },
  { id: 18, name: "Đồng hồ thông minh thể thao nam", category: "dong-ho-nam", price: 549000, oldPrice: 890000, rating: 4.7, sold: 2600, sku: "MN-SW-018", desc: "Đo nhịp tim, theo dõi giấc ngủ, chống nước, pin dùng 7 ngày." },
  { id: 19, name: "Balo laptop nam chống nước", category: "balo-tui-nam", price: 329000, oldPrice: 490000, rating: 4.7, sold: 1740, sku: "MN-BP-019", desc: "Chứa laptop 15.6 inch, vải chống thấm nước, nhiều ngăn tiện dụng." },
  { id: 20, name: "Túi đeo chéo nam da PU", category: "balo-tui-nam", price: 219000, oldPrice: 340000, rating: 4.6, sold: 890, sku: "MN-CB-020", desc: "Thiết kế nhỏ gọn, tiện lợi đựng điện thoại, ví, giấy tờ." },
];

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function iconSvg(icon, size) {
  return `<svg width="${size}" height="${size}"><use href="#icon-${icon}"/></svg>`;
}
