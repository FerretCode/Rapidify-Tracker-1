import { PUBLIC_BACKEND_API } from "$env/static/public";
import { ENVIRONMENT } from "$env/static/private";
import * as https from "https";
import fetch from "node-fetch";

/** @type {import('./$types').Actions} */
export const actions = {
  addRecurringExpense: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");
    const data = await request.formData();

    console.log(data);

    if (!user) return;

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

    const expenses = [];

    for (const pair of data) {
      if (pair[0] === "expenses[]") expenses.push(parseFloat(pair[1]));
    }

    console.log(expenses);

    const sum = expenses.reduce((total, a) => total + a, 0);

    console.log(sum);

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        category: "general",
        amount: sum,
        recurring: true,
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/track/expense/add`,
      fetchOptions
    );

    if (res.status !== 200) {
      console.log(res.status + ": There was an error adding the expense.");
    }
  },
  addExpense: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");
    const data = await request.formData();

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
      method: "POST",
      body: JSON.stringify({
        category: "general",
        amount: parseFloat(data.get("expense")),
        recurring: false,
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/track/expense/add`,
      fetchOptions
    );

    if (res.status !== 200) {
      return Error(res.status + ": There was an error adding the expense.");
    }
  },
};
