import { getProducts } from "@/lib/products";
import { ProductSearch } from "./ProductSearch";

export default async function Home() {
  try {
    const allProducts = await getProducts();

    // Group products by product_id and get the main product with variant count
    const mainProducts = Object.values(
      allProducts.reduce((acc, product) => {
        if (!acc[product.product_id]) {
          acc[product.product_id] = {
            ...product,
            variantCount: 1,
          };
        } else {
          acc[product.product_id].variantCount += 1;
        }
        return acc;
      }, {} as Record<string, (typeof allProducts)[0] & { variantCount: number }>)
    );

    return (
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center w-full text-gray-900">
          <ProductSearch products={mainProducts} />
        </main>
      </div>
    );
  } catch (error: unknown) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Welcome to EightComercio</h1>
          <p className="text-red-500">
            {(error as { message: string }).message}
          </p>
        </main>
      </div>
    );
  }
}
