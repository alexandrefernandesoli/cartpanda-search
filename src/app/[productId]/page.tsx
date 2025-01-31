import { getProduct } from "@/lib/products";

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
    <div>
      <h1>Product Page</h1>
    </div>
  );
}
