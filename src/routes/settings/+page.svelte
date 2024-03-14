<script>
  import Card from "$lib/components/Card.svelte";
  import FolderIcon from "$lib/assets/icons/FolderIcon.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import PlusIcon from "$lib/assets/icons/PlusIcon.svelte";

  export let data;

  console.log(data);

  const PUBLIC_BACKEND_API = data.PUBLIC_BACKEND_API;

  let modalOpen = {
    stockx: false,
    ebay: false,
    laced: false,
    webhook: false,
  };

  let stockxOauthComplete = false;

  const openStockxModal = () => {
    modalOpen["stockx"] = true;
  };

  const closeStockxModal = () => {
    modalOpen["stockx"] = false;
  };

  const openEbayModal = () => {
    modalOpen["ebay"] = true;
  };

  const closeEbayModal = () => {
    modalOpen["ebay"] = false;
  };

  const openLacedModal = () => {
    modalOpen["laced"] = true;
  };

  const closeLacedModal = () => {
    modalOpen["laced"] = false;
  };

  const openWebhookModal = () => {
    modalOpen["webhook"] = true;
  };

  const closeWebhookModal = () => {
    modalOpen["webhook"] = false;
  };
</script>

<svelte:head>
  <title>Settings</title>
  <meta name="description" content="Settings page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
  <div class="container">
    <div class="row">
      <div class="col-xxl-5 col-xl-8 mx-auto">
        <Card>
          <h3 class="card__title">Logins</h3>
          <div class="card__list">
            <div class="card__list__item">
              <p class="card__list__item__text">StockX</p>
              <h4 class="card__list__item__title">
                {#if data.stockx}
                  <p>Logged In</p>
                {:else if !modalOpen.stockx}
                  <!--
                  <button
                    class="btn btn--primary"
                    aria-label="Open modal"
                    disabled
                    on:click={openStockxModal}
                  >
                    Login
                  </button>
                -->
                  <p>Coming Soon</p>
                {:else if modalOpen.stockx}
                  <div class="container-fluid">
                    <Modal on:close={closeStockxModal}>
                      <form action="?/loginStockx" method="post">
                        <div class="card__list__item">
                          <p class="card__list__item__text mb-3">
                            StockX API Key
                          </p>
                          <input
                            class="card__list__item__input"
                            type="text"
                            placeholder="Type here"
                            name="stockx_api_key"
                            required
                          />
                        </div>
                        <div class="card__list__item">
                          <p class="card__list__item__text mb-3 text-left">
                            Login with StockX
                          </p>
                          <a
                            class="btn btn--primary"
                            href="{PUBLIC_BACKEND_API}/auth/stockx/login"
                            >Auth with StockX</a
                          >
                        </div>
                        <div>
                          <button type="submit" class="btn btn--primary"
                            >Login</button
                          >
                        </div>
                      </form>
                    </Modal>
                  </div>{/if}
              </h4>
            </div>
            <div class="card__list__item">
              <p class="card__list__item__text">eBay</p>
              <h4 class="card__list__item__title">
                {#if data.ebay}
                  <p>Logged In</p>
                {:else}
                  <a
                    class="btn btn--primary"
                    href="{PUBLIC_BACKEND_API}/auth/ebay/login">Login</a
                  >
                {/if}
              </h4>
            </div>
            <div class="card__list__item">
              <p class="card__list__item__text">Goat / Alias</p>
              <h4 class="card__list__item__title">Coming Soon</h4>
            </div>
            <div class="card__list__item">
              <p class="card__list__item__text">Laced</p>
              <h4 class="card__list__item__title">
                {#if data.laced}
                  <p>Logged In</p>
                {:else if !modalOpen.laced}
                  <button
                    class="btn btn--primary"
                    aria-label="Open modal"
                    on:click={openLacedModal}
                  >
                    Login
                  </button>
                {:else if modalOpen.laced}
                  <div class="container-fluid">
                    <Modal on:close={closeLacedModal}>
                      <form action="?/loginLaced" method="post">
                        <div class="card__list__item">
                          <p class="card__list__item__text mb-3">
                            Laced User Cookie
                          </p>
                          <input
                            class="card__list__item__input"
                            type="text"
                            placeholder="Type here"
                            name="laced_api_key"
                            required
                          />
                        </div>
                        <div>
                          <button type="submit" class="btn btn--primary"
                            >Login</button
                          >
                        </div>
                      </form>
                    </Modal>
                  </div>{/if}
              </h4>
            </div>
            <div class="card__list__item">
              <p class="card__list__item__text">Discord Webhook</p>
              <h4 class="card__list__item__title">
                {#if !modalOpen.webhook}
                  <button
                    class="btn btn--primary"
                    aria-label="Open modal"
                    on:click={openWebhookModal}
                  >
                    Change or Link Webhook
                  </button>
                {:else if modalOpen.webhook}
                  <div class="container-fluid">
                    <Modal on:close={closeWebhookModal}>
                      <form action="?/linkWebhook" method="post">
                        <div class="card__list__item">
                          <p class="card__list__item__text mb-3">
                            Discord Webhook URL
                          </p>
                          <input
                            class="card__list__item__input"
                            type="text"
                            placeholder="Type here"
                            name="discord_webhook"
                            required
                          />
                        </div>
                        <div>
                          <button type="submit" class="btn btn--primary"
                            >Link Webhook</button
                          >
                        </div>
                      </form>
                    </Modal>
                  </div>{/if}
              </h4>
            </div>
            <div>
              <p class="card__list__item__text mb-3">Import Inventory</p>
              <form
                enctype="multipart/form-data"
                method="post"
                action="?/uploadCsv"
              >
                <label class="custom-uploader">
                  <input
                    type="file"
                    name="inventory_upload"
                    class="custom-uploader__input"
                    accept=".csv"
                  />
                  <span class="custom-uploader__btn">
                    <svelte:component this={FolderIcon} />
                  </span>
                </label>
                <button class="btn btn--primary mt-4" type="submit"
                  >Import Stock</button
                >
              </form>
              <p class="card__list__item__text mt-2">
                <small>*only CSV files will be accepted</small>
              </p>
            </div>
          </div>
          <button href="#!" class="btn btn--dark w-100 my-3" disabled
            >Export Inventory</button
          >
          <form method="post" action="?/logout">
            <button type="submit" class="btn btn--primary w-100"
              >Log Out Of Accounts</button
            >
          </form>
        </Card>
      </div>
    </div>
  </div>
</section>
