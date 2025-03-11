// generateCSV para logística
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateCSV(product: any) {
  const headers = "Product, SKU";
  const productRow = `${product.title},`;
  const csvRows = product.product_variants.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (variant: any) => `${variant.title},${variant.sku}`
  );
  const csvData = `data:text/csv;charset=utf-8,${headers}\n${productRow}\n${csvRows.join(
    "\n"
  )}`;

  const link = document.createElement("a");
  link.href = encodeURI(csvData);
  link.download = "logistic.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
