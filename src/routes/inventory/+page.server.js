import { redirect, fail } from "@sveltejs/kit";
import { ENVIRONMENT } from "$env/static/private";
import { PUBLIC_BACKEND_API } from "$env/static/public";
import dayjs from "dayjs";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import('./$types').Actions} */
export const actions = {
  addItem: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");
    const data = await request.formData();

    if (!user) return fail(403);

    let httpsAgent;

    if (ENVIRONMENT === "dev") {
      httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    } else {
      httpsAgent = new https.Agent({
        rejectUnauthorized: true,
      });
    }

    console.log(data);

    console.log(data.get("image"));

    const validationFilters = [
      "product_name",
      "price_paid",
      "size",
      "quantity",
      "payment_method",
      "listed_on_marketplace",
      "local_market_price",
      "date",
      "sku",
      "image",
    ];

    const goatListings = [];
    const ebayListings = [];
    const stockXListings = [];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return fail(400, { [pair[0]]: undefined, missing: true });
      }

      if (pair[0] === "goat[]") goatListings.push(pair[1]);
      if (pair[0] === "stockx[]") stockXListings.push(pair[1]);
      if (pair[0] === "ebay[]") ebayListings.push(pair[1]);
    }

    const file = data.get("image");

    const buffer = await file.arrayBuffer();
    const content = Buffer.from(buffer).toString("base64");

    let base64Image = content.split(";base64,").pop();

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        name: data.get("product_name"),
        item_name: data.get("product_name"),
        count: parseInt(data.get("quantity")),
        market_price: parseFloat(data.get("local_market_price")),
        public: data.get("listed_on_marketplace") === "True" ? true : false,
        price: parseFloat(data.get("price_paid")),
        sizes: [data.get("size")],
        payment_method: data.get("payment_method"),
        image: base64Image,
        date_of_purchase: `${dayjs(data.get("date")).unix()}`,
        sku: data.get("sku"),
        listings: [
          ...goatListings
            .map((listingId) => {
              if (!listingId || listingId === "0") return null;

              return {
                platform: "goat",
                listing_id: listingId,
              };
            })
            .filter((listing) => listing !== null),
          ...ebayListings
            .map((listingId) => {
              if (!listingId || listingId === "0") return null;

              return {
                platform: "ebay",
                listing_id: listingId,
              };
            })
            .filter((listing) => listing !== null),
          ...stockXListings
            .map((listingId) => {
              if (!listingId || listingId === "0") return null;

              return {
                platform: "stockx",
                listing_id: listingId,
              };
            })
            .filter((listing) => listing !== null),
        ],
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    console.log(fetchOptions.body);

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/inventory/add`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }
  },
};

/** @type {import("./$types").PageLoad} */
export async function load({ cookies }) {
  const user = await cookies.get("rapidify");

  if (!user) throw redirect(307, `${PUBLIC_BACKEND_API}/auth/login`);

  let httpsAgent;

  if (ENVIRONMENT === "dev") {
    httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  } else {
    httpsAgent = new https.Agent({
      rejectUnauthorized: true,
    });
  }

  const res = await fetch(`${PUBLIC_BACKEND_API}/dashboard/inventory/list`, {
    agent: httpsAgent,
    headers: {
      Cookie: `rapidify=${cookies.get("rapidify")}`,
    },
  });

  const data = await res.text();
  let items;

  try {
    items = JSON.parse(data);
  } catch (err) {
    console.error(`Error occurred parsing data: ${err}\nResponse: ${data}`);
  }

  return {
    inventory: items,
    PUBLIC_BACKEND_API,
  };
}
