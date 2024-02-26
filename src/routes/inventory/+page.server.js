import { redirect } from "@sveltejs/kit";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import("./$types").PageLoad} */
export async function load({ cookies }) {
  const user = await cookies.get("rapidify");

  if (!user) throw redirect(307, `${process.env.BACKEND_API}/auth/login`);

  let httpsAgent;

  if (process.env.ENVIRONMENT === "dev") {
    httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  } else {
    httpsAgent = new https.Agent({
      rejectUnauthorized: true,
    });
  }

  const res = await fetch(
    `${process.env.BACKEND_API}/dashboard/inventory/list`,
    {
      agent: httpsAgent,
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`
      }
    }
  )

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

  console.log(items)

  return {
    inventory: items
  }
}
