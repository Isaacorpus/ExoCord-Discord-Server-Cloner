import input from "input";
import products from "./la-huerta-products.js";

const cart = [];

const listProducts = () => {
  console.log("Available La Huerta products:");
  products.forEach((p) => {
    console.log(`${p.id}. ${p.name} - $${p.price}`);
  });
};

const addToCart = async () => {
  while (true) {
    const idStr = await input.text(
      "Enter product ID to add or press ENTER to checkout:"
    );
    if (!idStr) break;
    const product = products.find((p) => p.id === Number(idStr));
    if (!product) {
      console.log("Invalid product ID");
      continue;
    }
    const qtyStr = await input.text("Quantity:");
    const qty = Number(qtyStr);
    if (isNaN(qty) || qty <= 0) {
      console.log("Invalid quantity");
      continue;
    }
    cart.push({ ...product, quantity: qty });
  }
};

const checkout = () => {
  console.log("\nPurchase summary:");
  let total = 0;
  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    console.log(`${item.name} x${item.quantity} - $${subtotal}`);
  });
  console.log(`Total: $${total}`);
};

const main = async () => {
  listProducts();
  await addToCart();
  checkout();
};

main();
