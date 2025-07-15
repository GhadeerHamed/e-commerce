import axios from "axios";

// --- Auth ---
export async function register(data: { name: string; email: string; password: string; role: string }) {
  const res = await axios.post("/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await axios.post("/login", data);
  return res.data;
}

export async function getUser() {
  const res = await axios.get("/user");
  return res.data;
}

// --- Products ---
export async function getProducts(page?: number) {
  const res = await axios.get("/products", { params: page ? { page } : {} });
  return res.data;
}

export async function getProductById(id: number) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(data: { name: string; description: string; price: number; quantity: number }) {
  const res = await axios.post("/products", data);
  return res.data;
}

export async function updateProduct(id: number, data: { name: string; description: string; price: number; quantity: number }) {
  const res = await axios.patch(`/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id: number) {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
}

// --- Cart ---
export async function getCart() {
  const res = await axios.get("/cart");
  return res.data;
}

export async function addItemToCart(product_id: number) {
  const res = await axios.post("/cart/add-item", { product_id });
  return res.data;
}

export async function decrementCartItem(product_id: number) {
  const res = await axios.post("/cart/decrement", { product_id });
  return res.data;
}

export async function removeItemFromCart(product_id: number) {
  const res = await axios.post("/cart/remove-item", { product_id });
  return res.data;
}

export async function clearCart() {
  const res = await axios.post("/cart/clear");
  return res.data;
}

export async function checkoutCart() {
  const res = await axios.post("/cart/checkout");
  return res.data;
}

// --- Orders ---
export async function getMyOrders() {
  const res = await axios.get("/orders");
  return res.data;
}

export async function getSupplierOrders() {
  const res = await axios.get("/supplier-orders");
  return res.data;
}

export async function getOrderById(id: number) {
  const res = await axios.get(`/orders/${id}`);
  return res.data;
}

export async function completeOrder(id: number) {
  const res = await axios.post(`/orders/${id}/complete`);
  return res.data;
}

export async function getSupplierProducts(page?: number) {
  const res = await axios.get("/supplier-products", { params: page ? { page } : {} });
  return res.data;
} 