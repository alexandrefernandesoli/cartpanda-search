import { cookies } from "next/headers";

const skuData = {
  conta: ["GrupoSixLLP"],
  squad: ["Delta", "Echo"],
  produto: [
    "SUGARSIX",
    "FLORASLIM",
    "PROSTASLIM",
    "ENDOPOWERPRO",
    "LIPOGUMMIES",
    "FLORALEAN",
    "ALPHAGUMMY",
    "PUREGUTPRO",
    "NERVEBLISS",
    "BACKSHIFTPRO",
    "MOUNJAGUMMY",
  ],
  vsl: [
    "CALLCENTER",
    "VSL1",
    "VSL2",
    "VSL3",
    "VSL4",
    "VSL5",
    "VSL6",
    "VSL7",
    "VSL8",
    "VSL9",
    "VSL10",
  ],
  rede: [
    "CALLCENTER",
    "FACEBOOK",
    "YOUTUBE",
    "SEARCH",
    "NATIVE",
    "AFILIADOS",
    "EMAIL",
    "SMS",
    "GERAL",
  ],
  tipo_de_venda: ["CALLCENTER", "FRONT", "BACKREDIRECT", "UPSELL", "DOWNSELL"],
  kit: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  preco: [
    "5",
    "19",
    "29",
    "39",
    "49",
    "59",
    "69",
    "79",
    "89",
    "99",
    "109",
    "119",
    "129",
    "147",
    "149",
    "177",
    "198",
    "234",
    "261",
    "294",
    "351",
  ],
};

const decodeSKU = (sku: string) => {
  const pattern = /A(\d+)B(\d+)C(\d+)D(\d+)E(\d+)F(\d+)G(\d+)H(\d+)/;
  const matches = sku.match(pattern);

  if (!matches) {
    return {
      conta: "INVALID",
      squad: "INVALID",
      produto: "INVALID",
      vsl: "INVALID",
      rede: "INVALID",
      tipo_de_venda: "INVALID",
      kit: "INVALID",
      preco: "INVALID",
    };
  }

  const decoded = {
    conta: skuData.conta[parseInt(matches[1]) - 1],
    squad: skuData.squad[parseInt(matches[2]) - 1],
    produto: skuData.produto[parseInt(matches[3]) - 1],
    vsl: skuData.vsl[parseInt(matches[4])],
    rede: skuData.rede[parseInt(matches[5]) - 1],
    tipo_de_venda: skuData.tipo_de_venda[parseInt(matches[6]) - 1],
    kit: skuData.kit[parseInt(matches[7]) - 1],
    preco: matches[8],
  };

  return decoded;
};

export async function getProducts() {
  // get cookie slug
  const c = await cookies();

  const slug = c.get("slug");
  const token = c.get("token");

  if (!slug || !token) {
    throw new Error("Slug and token are required");
  }

  try {
    const data = await fetch(
      `https://accounts.cartpanda.com/api/${slug.value}/products`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!data.ok) {
      throw new Error("Failed to fetch data");
    }

    const realData = await data.json();
    let products = realData.products.data as {
      title: string;
      id: number;
      product_variants: {
        title: string;
        price: string;
        id: number;
        sku: string;
        variant_image?: { image: { url: string } }[];
      }[];
    }[];

    products = products.filter((product) => product.id != 18774493);

    const productsVariants = [] as {
      image?: string;
      product_title: string;
      product_id: string;
      title: string;
      price: string;
      id: number;
      checkout: string;
      sku: string;
      decoded: {
        conta: string;
        squad: string;
        produto: string;
        vsl: string;
        rede: string;
        tipo_de_venda: string;
        kit: string;
        preco: string;
      };
    }[];

    products.forEach((product) => {
      product.product_variants.forEach((variant) => {
        const image =
          variant.variant_image && variant.variant_image[0]
            ? variant.variant_image[0].image.url
            : undefined;

        productsVariants.push({
          image: image,
          product_title: product.title,
          product_id: product.id.toString(),
          title: variant.title,
          price: variant.price,
          id: variant.id,
          sku: variant.sku,
          decoded: decodeSKU(variant.sku),
          checkout: `https://${slug.value}.mycartpanda.com/checkout/${variant.id}:1`,
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

    return productsVariants;
  } catch (error: unknown) {
    const errorMessage = (error as { message: string }).message;
    throw new Error("Failed to fetch data: " + errorMessage);
  }
}

export async function getProduct({ id }: { id: string }) {
  const c = await cookies();

  const slug = c.get("slug");
  const token = c.get("token");

  if (!slug || !token) {
    throw new Error("Slug and token are required");
  }

  const response = await fetch(
    `https://accounts.cartpanda.com/api/${slug.value}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = await response.json();

  const productVariants = [] as {
    image?: string;
    product_title: string;
    product_id: string;
    title: string;
    price: string;
    id: number;
    checkout: string;
    sku: string;
    decoded: {
      conta: string;
      squad: string;
      produto: string;
      vsl: string;
      rede: string;
      tipo_de_venda: string;
      kit: string;
      preco: string;
    };
  }[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.product.product_variants.forEach((variant: any) => {
    const image =
      variant.variant_image && variant.variant_image[0]
        ? variant.variant_image[0].image.url
        : undefined;

    productVariants.push({
      image: image,
      product_title: data.product.title,
      product_id: data.product.id.toString(),
      title: variant.title,
      price: variant.price,
      id: variant.id,
      sku: variant.sku,
      decoded: decodeSKU(variant.sku),
      checkout: `https://${slug.value}.mycartpanda.com/checkout/${variant.id}:1`,
    });
  });

  return {
    title: data.product.title,
    id: data.product.id,
    product_variants: productVariants,
  };
}
