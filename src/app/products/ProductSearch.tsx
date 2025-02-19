"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  image?: string;
  product_title: string;
  product_id: string;
  id: number;
  variantCount: number;
};

export function ProductSearch({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("");

  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter products..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">
                Product
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">
                Variants
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.product_title}
                      width="90"
                      height="90"
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <Image
                      src="https://via.placeholder.com/90"
                      alt={product.product_title}
                      width="90"
                      height="90"
                      className="rounded-lg"
                    />
                  )}
                </td>
                <td className="p-4">
                  <Link
                    href={`/${product.product_id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {product.product_title}
                  </Link>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {product.variantCount} variants
                  </span>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
