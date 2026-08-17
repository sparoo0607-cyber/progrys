async function main() {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();
  const product = products[0];
  console.log("Product:", product.id);

  const res2 = await fetch(`http://localhost:3000/api/products/${product.id}/download`);
  if (res2.ok) {
    const data = await res2.json();
    console.log("Download route success. DataUrl length:", data.dataUrl ? data.dataUrl.length : 0);
  } else {
    const text = await res2.text();
    console.log("Download route failed:", res2.status, text);
  }
}
main();
