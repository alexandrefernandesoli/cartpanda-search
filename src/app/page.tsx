import CopyButton from "./copyButtom";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const data = await fetch(
    "https://accounts.cartpanda.com/api/eightcomercio/products",
    {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    }
  );

  try {
    if (!data.ok) {
      throw new Error("Failed to fetch data");
    }

    const realData = await data.json();
    const products = realData.products.data;

    const productsVariants = [] as {
      product_title: string;
      title: string;
      price: string;
      id: string;
      checkout: string;
    }[];

    products.forEach((product) => {
      product.product_variants.forEach((variant) => {
        productsVariants.push({
          product_title: product.title,
          title: variant.title,
          price: variant.price,
          id: variant.id,
          checkout: `https://eightcomercio.mycartpanda.com/checkout/${variant.id}:1`,
        });
      });
    });

    // order by product_title
    productsVariants.sort((a, b) => {
      if (a.product_title < b.product_title) {
        return -1;
      }
      if (a.product_title > b.product_title) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Welcome to EightComercio</h1>

          <table>
            <thead>
              <tr className="border">
                <th className="p-2">Product</th>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Checkout</th>
              </tr>
            </thead>
            <tbody>
              {productsVariants.map((product) => (
                <tr className="border" key={product.id}>
                  <td className="p-2">{product.product_title}</td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">
                    <CopyButton text={product.checkout} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Welcome to EightComercio</h1>
          <p className="text-red-500">{error.message}</p>
        </main>
      </div>
    );
  }
}
