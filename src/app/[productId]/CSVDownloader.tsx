'use client'

import { generateCSV } from "@/lib/generateCsv";

export default function CSVDownloader(product) {
  return <button
    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={() => {
      generateCSV(product.product);
    }}
  >
    Baixar CSV
  </button>
}