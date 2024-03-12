<script>
  import Card from "$lib/components/Card.svelte";
  import { enhance } from "$app/forms";
  import { PUBLIC_BACKEND_API } from "$env/static/public";
  import dayjs from "dayjs";

  let proceededClickCount = 0;

  function incrementProceededClickCount() {
    proceededClickCount++;
  }

  function decrementProceededClickCount() {
    proceededClickCount--;
  }

  let from;
  let to;
  let number;
  let product_name;
  let quantity;
  let price;
  let due_date = "2024-01-01";
  let terms;
  let notes;

  let email;
  let method;
  let firstName;
  let lastName;
  let postalCode;
  let firstAddress;
  let secondAddress;
  let numberOfRandomizes;
</script>

<svelte:head>
  <title>Tools</title>
  <meta name="description" content="Tools page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col-xxl-4 col-xl-6 col-12 mb-4 mb-xl-0">
        <Card>
          <h3 class="card__title">Randomise Information</h3>
          <form action="?/randomize">
            <div class="card__list">
              <div class="card__list__item">
                <p class="card__list__item__text">First Name</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={firstName}
                  placeholder="Type here"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Last Name</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={lastName}
                  placeholder="Type here"
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Email / Catchall Domain</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={email}
                  placeholder="Type here"
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Address Line 1</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={firstAddress}
                  placeholder="Type here"
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Address Line 2</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={secondAddress}
                  placeholder="Type here"
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Postal Code</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  bind:value={postalCode}
                  placeholder="Type here"
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Randomize Method</p>
                <select
                  class="card__list__item__input"
                  name="method"
                  bind:value={method}
                  required
                >
                  <option value="before" selected>Random Before</option>
                  <option value="after">Random After</option>
                  <option value="before_after">Before & After</option>
                  <option value="double">Double Letters</option>
                  <option value="before_double">Double Letters Before</option>
                  <option value="after_double">Double Letters After</option>
                  <option value="before_after_double"
                    >Double Letters Before & After</option
                  >
                  <option value="period">Period Splices</option>
                  <option value="before_period">Period Splices Before</option>
                  <option value="after_period">Period Slices After</option>
                  <option value="before_after_period"
                    >Period Slices Before & After</option
                  >
                </select>
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Num. Of Randomises</p>
                <input
                  class="card__list__item__input"
                  type="number"
                  bind:value={numberOfRandomizes}
                  placeholder="Type here"
                />
              </div>
            </div>
            <a
              href="{PUBLIC_BACKEND_API}/tools/randomize?to_randomize[Address Line 1]={firstAddress}&to_randomize[Address Line 2]={secondAddress}&to_randomize[First Name]={firstName}&to_randomize[Last Name]={lastName}&to_randomize[Postal Code]={postalCode}&to_randomize[Email]={email}&num_randomizes={numberOfRandomizes}&method={method}"
              download="invoice.pdf"
              class="btn btn--primary">Download .csv</a
            >
          </form>
        </Card>
      </div>
      <div class="col-xxl-4 col-xl-6 col-12 offset-xxl-1">
        <Card>
          <h3 class="card__title">Invoice Generator</h3>
          <form action="?/invoice" method="post" use:enhance>
            <div
              aria-label="Form last step"
              class="formPage"
              class:show={proceededClickCount >= 1}
            >
              <div class="card__list">
                <div class="card__list__item">
                  <p class="card__list__item__text">Your Name</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="from"
                    bind:value={from}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Invoice Terms</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="terms"
                    bind:value={terms}
                    placeholder="Type here"
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Notes</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="notes"
                    bind:value={notes}
                    placeholder="Type here"
                  />
                </div>
              </div>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn--primary"
                  on:click={() => decrementProceededClickCount()}
                  >Previous Page</button
                >
                <a
                  href="{PUBLIC_BACKEND_API}/tools/invoice/generate?from={from}&to={to}&number={number}&date={dayjs().unix()}&items[0][name]={product_name}&items[0][quantity]={quantity}&items[0][unit_cost]={price}&due_date={dayjs(
                    due_date
                  ).unix()}&notes={notes}&terms={terms}"
                  download="invoice.pdf"
                  class="btn btn--primary">Download Invoice</a
                >
              </div>
            </div>
            <div
              aria-label="Form first step"
              class="formPage"
              class:show={proceededClickCount < 1}
            >
              <div class="card__list">
                <div class="card__list__item">
                  <p class="card__list__item__text">Billing Name</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="to"
                    bind:value={to}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Product Name</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="product_name"
                    bind:value={product_name}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Quantity</p>
                  <input
                    class="card__list__item__input"
                    type="number"
                    name="quantity"
                    bind:value={quantity}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Price Per Item</p>
                  <input
                    class="card__list__item__input"
                    type="number"
                    name="price"
                    bind:value={price}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Tax Included</p>
                  <select class="card__list__item__input" required>
                    <option value="True">True</option>
                    <option value="False" selected>False</option>
                  </select>
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">VAT ID (Optional)</p>
                  <input
                    class="card__list__item__input"
                    type="string"
                    name="vat_number"
                    placeholder="Type here"
                  />
                </div>
                <div class="card__list__item">
                  <p class="card__list__item__text">Invoice Number</p>
                  <input
                    class="card__list__item__input"
                    type="text"
                    name="invoice_number"
                    bind:value={number}
                    placeholder="Type here"
                    required
                  />
                </div>
                <div>
                  <p class="card__list__item__text">Due Date</p>
                  <input
                    class="card__list__item__input"
                    type="date"
                    name="invoice_number"
                    bind:value={due_date}
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn btn--primary w-100"
                on:click={() => incrementProceededClickCount()}
                >Next Page</button
              >
            </div>
          </form>
        </Card>
      </div>
    </div>
  </div>
</section>

<style>
  .formPage {
    display: none;
  }
  .formPage.show {
    display: block;
  }
</style>
