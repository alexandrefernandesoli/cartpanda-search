import Image from "next/image";
import CopyButton from "./copyButtom";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const params = await searchParams;

  try {
    const products = await getProducts(params);

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Welcome to EightComercio</h1>

          <table>
            <thead>
              <tr className="border">
                <th className="p-2">Image</th>
                <th className="p-2">Product</th>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">SKU</th>
                <th className="p-2">Rede</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Checkout</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="border" key={product.id}>
                  <td className="p-2 text-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.product_title}
                        width="90"
                        height="90"
                      />
                    ) : (
                      // placeholder from https://placeholder.com/
                      <Image
                        src="https://via.placeholder.com/90"
                        alt={product.product_title}
                        width="90"
                        height="90"
                      />
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <Link
                      href={`/${product.product_id}?token=${params.token}`}
                      className="text-blue-500 hover:underline"
                    >
                      {product.product_title}
                    </Link>
                  </td>
                  <td className="p-2 text-center">{product.title}</td>
                  <td className="p-2 text-center">{product.price}</td>
                  <td className="p-2 text-center">{product.sku}</td>
                  <td className="p-2 text-center">{product.decoded.rede}</td>
                  <td className="p-2 text-center">
                    {product.decoded.tipo_de_venda}
                  </td>
                  <td className="p-2 text-center text-blue-500 hover:underline">
                    <a href={product.checkout} target="_blank">
                      {product.checkout}
                    </a>
                  </td>
                  <td className="p-2 text-center">
                    <CopyButton text={product.checkout} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
