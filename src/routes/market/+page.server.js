import { redirect } from "@sveltejs/kit";
import { ENVIRONMENT } from "$env/static/private";
import { PUBLIC_BACKEND_API } from "$env/static/public";
import * as https from "https";
import fetch from "node-fetch";

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

  const res = await fetch(`${PUBLIC_BACKEND_API}/dashboard/marketplace`, {
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

  console.log(items);

  return {
    inventory: items,
    PUBLIC_BACKEND_API,
  };
}
