import { PUBLIC_BACKEND_API } from "$env/static/public";
import { ENVIRONMENT } from "$env/static/private";
import dayjs from "dayjs";
import * as https from "https";
import fetch from "node-fetch";
import { fail } from "assert";

/** @type {import('./$types').Actions} */
export const actions = {
  randomize: async ({ cookies, request }) => {},
  invoice: async ({ cookies, request }) => {
    const user = await cookies.get("rapidify");
    const data = await request.formData();

    if (!user) fail(400);

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

    /*
      type InvoiceGenerationRequest struct {
        From    string `json:"from"`
        To      string `json:"to"`
        Logo    string `json:"logo"`
        Number  string `json:"number"`
        Date    int64  `json:"date"`
        DueDate int64  `json:"due_date"`
        Items   []struct {
          Name     string  `json:"name"`
          Quantity int     `json:"quantity"`
          UnitCost float64 `json:"unit_cost"`
        } `json:"items"`
        TaxTitle string `json:"tax_title"`
        Fields   struct {
          Tax string `json:"tax"`
        }
        Tax   int
        Notes string `json:"notes"`
        Terms string `json:"terms"`
      }
     */

    const fetchOptions = {
      agent: httpsAgent,
      method: "POST",
      body: JSON.stringify({
        from: data.get("from"),
        to: data.get("to"),
        number: data.get("invoice_number"),
        date: dayjs().unix(),
        items: [
          {
            name: data.get("product_name"),
            quantity: parseInt(data.get("quantity")),
            unit_cost: parseFloat(data.get("price")),
          },
        ],
      }),
      headers: {
        Cookie: `rapidify=${cookies.get("rapidify")}`,
      },
    };

    const res = await fetch(
      `${PUBLIC_BACKEND_API}/dashboard/tools/invoice/generate`,
      fetchOptions
    );

    if (res.status !== 200) {
      return fail(500);
    }

    const pdf = await res.text();

    console.log(pdf);

    return { invoice: pdf, success: true };
  },
};
