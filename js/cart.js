// Quản lý giỏ hàng bằng localStorage, dùng chung cho mọi trang
const CART_KEY = "shopviet_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  } else {
    const item = cart.find((i) => i.id === id);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartTotalCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function getCartDetails() {
  return getCart()
    .map((i) => {
      const product = getProductById(i.id);
      if (!product) return null;
      return { ...product, qty: i.qty, lineTotal: product.price * i.qty };
    })
    .filter(Boolean);
}

function getCartTotalPrice() {
  return getCartDetails().reduce((sum, i) => sum + i.lineTotal, 0);
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = getCartTotalCount();
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);
