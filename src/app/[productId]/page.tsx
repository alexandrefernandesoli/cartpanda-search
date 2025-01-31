import { getProduct } from "@/lib/products";
import Image from "next/image";
import CopyButton from "../copyButtom";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ token: string }>;
}) {
  const search = await searchParams;
  const pageParams = await params;

  const product = await getProduct({
    id: pageParams.productId,
    token: search.token,
  });

  console.log(pageParams.productId, search.token, product);

  return (
    <div className="flex items-center flex-col justify-center">
      <h1 className="text-3xl py-4">Product Page {product.title}</h1>

      <table>
        <thead>
          <tr className="border">
            <th className="p-2">Image</th>
            <th className="p-2">SKU</th>
            <th className="p-2">VSL</th>
            <th className="p-2">KIT</th>
            <th className="p-2">Price</th>
            <th className="p-2">Rede</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Checkout</th>
          </tr>
        </thead>
        <tbody>
          {product.product_variants.map((product) => (
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
              <td className="p-2 text-center">{product.sku}</td>
              <td className="p-2 text-center">{product.decoded.vsl}</td>
              <td className="p-2 text-center">{product.decoded.kit}</td>
              <td className="p-2 text-center">{product.decoded.preco}</td>
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
    </div>
  );
}
