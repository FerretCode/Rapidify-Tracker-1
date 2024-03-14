import { redirect, fail } from "@sveltejs/kit";
import { ENVIRONMENT } from "$env/static/private";
import { PUBLIC_BACKEND_API } from "$env/static/public";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import('./$types').Actions} */
export const actions = {
  loginStockX: async ({ cookies, request }) => {
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

    const validationFilters = ["stockx_api_key"];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return fail(400, { [pair[0]]: undefined, missing: true });
      }
    }

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        platform_name: "stockx",
        api_key: data.get("stockx_api_key"),
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/platforms/add`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }
  },
  loginLaced: async ({ cookies, request }) => {
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

    const validationFilters = ["laced_api_key"];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return fail(400, { [pair[0]]: undefined, missing: true });
      }
    }

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        platform_name: "laced",
        api_key: data.get("laced_api_key"),
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/platforms/add`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }
  },
  linkWebhook: async ({ cookies, request }) => {
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

    const validationFilters = ["discord_webhoo"];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return fail(400, { [pair[0]]: undefined, missing: true });
      }
    }

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        discord_webhook: data.get("discord_webhook"),
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/notification/link`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }
  },
  logout: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");

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

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      headers: {
        Cookie: "rapidify=" + cookies.get("rapidify"),
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/platforms/logout`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }
  },
  uploadCsv: async ({ cookies, request }) => {
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

    const validationFilters = ["inventory_upload"];

    for (const pair of data) {
      if (validationFilters.includes(pair[0]) && pair[1] === "") {
        return fail(400, { [pair[0]]: undefined, missing: true });
      }
    }

    const file = data.get("inventory_upload");

    const buffer = await file.arrayBuffer();
    const content = Buffer.from(buffer).toString("base64");

    let base64Csv = content.split(";base64,").pop();

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        csv: base64Csv,
      }),
      headers: {
        Cookie: "rapidify=" + cookies.get("rapidify"),
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/inventory/add-csv`,
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

  const res = await fetch(`${PUBLIC_BACKEND_API}/dashboard/platforms/status`, {
    agent: httpsAgent,
    headers: {
      Cookie: `rapidify=${cookies.get("rapidify")}`,
    },
  });

  const data = await res.text();
  let status;

  try {
    status = JSON.parse(data);
  } catch (err) {
    console.error(`Error occurred parsing data: ${err}\nResponse: ${data}`);
  }

  console.log(status);

  return {
    PUBLIC_BACKEND_API,
    ebay: status.ebay,
    stockx: status.stockx,
    goat: status.goat,
    laced: status.laced,
  };
}
