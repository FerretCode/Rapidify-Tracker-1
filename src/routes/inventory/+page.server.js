import { redirect } from "@sveltejs/kit";
import { BACKEND_API, ENVIRONMENT } from "$env/static/private";
import dayjs from "dayjs";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import('./$types').Actions} */
export const actions = {
  addItem: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");
    const data = await request.formData();

    if (!user) throw redirect(307, `${process.env.BACKEND_API}/auth/login`);

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
    ];

    const goatListings = [];
    const ebayListings = [];
    const stockXListings = [];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return;
      }

      if (pair[0] === "goat[]") goatListings.push(pair[1]);
      if (pair[0] === "stockx[]") stockXListings.push(pair[1]);
      if (pair[0] === "ebay[]") ebayListings.push(pair[1]);
    }

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        name: data.get("product_name"),
        count: parseInt(data.get("quantity")),
        market_price: parseFloat(data.get("local_market_price")),
        price: parseFloat(data.get("price_paid")),
        sizes: [data.get("size")],
        payment_method: data.get("payment_method"),
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

    console.log(JSON.parse(fetchOptions.body));

    const res = await fetch(
      `${BACKEND_API}/dashboard/inventory/add`,
      fetchOptions
    );

    let dat;
    const body = await res.text();

    try {
      dat = JSON.parse(body);
    } catch (err) {
      console.error(`Error occurred parsing data: ${err}\nResponse: ${body}`);
    }

    console.log(dat);
  },
};

/** @type {import("./$types").PageLoad} */
export async function load({ cookies }) {
  const user = await cookies.get("rapidify");

  if (!user) throw redirect(307, `${BACKEND_API}/auth/login`);

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

  const res = await fetch(`${BACKEND_API}/dashboard/inventory/list`, {
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

  /*
    [
      {
        id: 'd0dc0a9f-0d14-4c72-8693-eb8c779616a8',
        user_id: 'ba93c89d-a7f7-4ddb-bc31-d6ad2c7f90c4',
        sizes: [ 'xl', 'sm', 'xsm' ],
        date_of_purchase: '1706113756',
        payment_method: 'card',
        listings: [ '09f14d7c-7c8a-4e4b-bc4e-fbdc5c16a72b' ],
        item_name: '',
        image: '/CW1590-100.jpg',
        invoice: '',
        name: 'Nike Dunk Low Black White GS',
        sku: 'CW1590-100',
        price: 600,
        public: true,
        sold: false,
        count: 8
      }
    ]
  */

  console.log(items);

  return {
    inventory: items,
  };
}
