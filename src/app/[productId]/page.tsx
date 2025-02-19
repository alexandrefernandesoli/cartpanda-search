import { getProduct } from "@/lib/products";
import Image from "next/image";
import CopyButton from "../copyButtom";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ token: string }>;
}) {
  const pageParams = await params;
  const product = await getProduct({ id: pageParams.productId });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-100 mb-8 text-center">
        {product.title}
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Image",
                "SKU",
                "VSL",
                "KIT",
                "Price",
                "Rede",
                "Tipo",
                "Checkout",
                "",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {product.product_variants.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={product.image || "https://via.placeholder.com/90"}
                    alt={product.product_title}
                    width="90"
                    height="90"
                    className="rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.decoded.vsl}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.decoded.kit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.decoded.preco}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.decoded.rede}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.decoded.tipo_de_venda}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={product.checkout}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {product.checkout}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <CopyButton text={product.checkout} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg p-6 space-y-8 text-sm text-gray-900">
        <h2 className="text-2xl font-bold">{product.title}</h2>

        {/* Group by vsl */}
        {Array.from(
          new Set(product.product_variants.map((v) => v.decoded.vsl))
        ).map((vsl) => (
          <div key={vsl} className="space-y-2">
            <h3 className="text-xl font-semibold">
              {product.title} {vsl}:
            </h3>

            <br />
            {Array.from(
              new Set(
                product.product_variants
                  .filter((v) => v.decoded.vsl === vsl)
                  .map((v) => v.decoded.rede)
              )
            ).map((rede) => (
              <div key={rede} className="ml-4">
                <h4 className="font-medium">{rede}:</h4>
                {Array.from(
                  new Set(
                    product.product_variants
                      .filter(
                        (v) => v.decoded.vsl === vsl && v.decoded.rede === rede
                      )
                      .map((v) => v.decoded.tipo_de_venda)
                  )
                ).map((tipo) => (
                  <div key={tipo} className="ml-8">
                    <h5 className="font-medium">{tipo}:</h5>
                    <div className="ml-4 space-y-1 whitespace-pre font-mono">
                      {product.product_variants
                        .filter(
                          (v) =>
                            v.decoded.vsl === vsl &&
                            v.decoded.rede === rede &&
                            v.decoded.tipo_de_venda === tipo
                        )
                        .sort(
                          (a, b) =>
                            Number(a.decoded.kit) - Number(b.decoded.kit)
                        )
                        .map((variant) => (
                          <div key={variant.id}>
                            {variant.decoded.kit}{" "}
                            {variant.decoded.kit === "1" ? "Bottle" : "Bottles"}
                            {"\t"} ${variant.decoded.preco}
                            {"\t"}
                            {variant.checkout}
                          </div>
                        ))}
                    </div>

                    <br />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
