import { PUBLIC_BACKEND_API } from "$env/static/public";
import { ENVIRONMENT } from "$env/static/private";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import('./$types').LayoutServerLoad} */
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

  const fetchOptions = {
    agent: httpsAgent,
    method: "GET",
    headers: {
      Cookie: `rapidify=${cookies.get("rapidify")}`,
    },
  };

  const res = await fetch(
    `${PUBLIC_BACKEND_API}/auth/account/me`,
    fetchOptions
  );

  const data = await res.text();

  let meResponse;

  try {
    meResponse = JSON.parse(data);
  } catch (err) {
    console.error(`Error occurred parsing data: ${err}\nResponse: ${data}`);
  }

  console.log(meResponse);

  return {
    discord_user: meResponse.discord_user,
  };
}
