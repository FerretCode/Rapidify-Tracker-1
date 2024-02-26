import { json, redirect } from "@sveltejs/kit";
import { BACKEND_API, ENVIRONMENT } from "$env/static/private";
import * as https from "https";
import fetch from "node-fetch";
import dayjs from "dayjs";

/** @type {import('./$types').PageLoad} */
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

  const date = dayjs();
  const dateFormat = "MMMM YYYY";

  const currentDate = date.format(dateFormat).split(" ");
  const lastMonthDate = date.subtract(1, "month").format(dateFormat).split(" ");

  const fetchOptions = {
    agent: httpsAgent,
    headers: {
      Cookie: `rapidify=${cookies.get("rapidify")}`,
    },
  };

  const res = await fetch(
    `${BACKEND_API}/track/statistics/get?month=${currentDate[0]}&year=${currentDate[1]}`,
    fetchOptions
  );

  const lastMonthRes = await fetch(
    `${BACKEND_API}/track/statistics/get?month=${lastMonthDate[0]}&year=${lastMonthDate[1]}`,
    fetchOptions
  );

  const data = await res.text();
  const lastMonthData = await lastMonthRes.text();

  let statistics;
  let lastMonthStatistics;

  try {
    statistics = JSON.parse(data);
    lastMonthStatistics = JSON.parse(lastMonthData);
  } catch (err) {
    console.error(`Error occurred parsing data: ${err}\nResponse: ${data}`);
  }

  console.log(statistics);

  return {
    statistics,
    lastMonthStatistics,
  };
}
