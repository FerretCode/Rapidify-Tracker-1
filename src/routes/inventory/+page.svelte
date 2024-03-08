<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import SearchIcon from "$lib/assets/icons/SearchIcon.svelte";
  import PlusIcon from "$lib/assets/icons/PlusIcon.svelte";
  import MinusIcon from "$lib/assets/icons/MinusIcon.svelte";
  import DotsIcon from "$lib/assets/icons/DotsIcon.svelte";
  import CloseIcon from "$lib/assets/icons/CloseIcon.svelte";
  import Modal from "$lib/components/Modal.svelte";

  let goatListed = false;
  let lacedListed = false;
  let stockxListed = false;
  let eBayListed = false;
  let proceededClickCount = 0;
  let itemCount = 0;

  let goatListings = 0;
  let eBayListings = 0;
  let stockXListings = 0;

  console.log(itemCount);

  function incrementProceededClickCount() {
    proceededClickCount++;
  }

  let inventoryData = [];

  const itemData = data.inventory.map((i, index) => {
    const item = i.group;
    const listings = i.listings;

    return i.items
      .map((i, index) => {
        return {
          inventoryId: item.id + "_" + index,
          upc: item.name,
          sku: item.sku,
          paidPrice: "£" + item.price,
          marketPrice: "£" + item.market_price,
          profit: `£${item.price - item.market_price}`,
          lastEdited: "22/01/2024",
          tags: [
            ...listings.map((listing) => {
              return {
                color: "#FFF",
                name:
                  listing.platform.charAt(0).toUpperCase() +
                  listing.platform.slice(1),
              };
            }),
            ...item.sizes.map((size) => {
              return {
                color: "#FFF",
                name: size.toUpperCase(),
              };
            }),
            {
              color: "#63FFAB",
              name: item.public ? "Public" : "Private",
            },
            {
              color: "#FF0000",
              name: item.count + " in group",
            },
          ],
        };
      })
      .flat();
  });

  inventoryData = itemData.flat();

  let groupData = data.inventory.map((item, index) => ({
    groupId: item.id,
    image: item.group.image,
    title: item.group.name,
    itemsNumber: item.group.count + " items",
    positiveCount: item.num_sales,
    negativeCount: item.group.count,
  }));

  let searchbar;
  let showSearchbar = false;
  const handleSearchbarShow = () => {
    showSearchbar = true;
    setTimeout(() => {
      searchbar.focus();
    }, 0);
  };
  const handleSearchbarHide = () => {
    if (searchbar.value.trim() !== "") {
      showSearchbar = true;
    } else {
      showSearchbar = false;
    }
  };

  let displayedInventorys = [...inventoryData];
  const handleInventorySearch = () => {
    let currentTypedValue = searchbar.value
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");
    if (currentTypedValue !== "") {
      displayedInventorys = inventoryData.filter((item) => {
        const searchableProperties = [
          "upc",
          "sku",
          "paidPrice",
          "marketPrice",
          "profit",
          "lastEdited",
          "tags",
        ];

        return searchableProperties.some((prop) => {
          if (Array.isArray(item[prop])) {
            return item[prop].some((tag) =>
              tag.name
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(currentTypedValue.toLowerCase())
            );
          } else {
            return item[prop]
              .toString()
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(currentTypedValue.toLowerCase());
          }
        });
      });
    } else {
      displayedInventorys = [...inventoryData];
    }
  };

  const handleInventoryDataRemove = (id) => {
    displayedInventorys = displayedInventorys.filter(
      (item) => item.inventoryId !== id
    );
  };

  const handleGroupDataRemove = (id) => {
    groupData = groupData.filter((item) => item.groupId !== id);
  };

  let showModal = false;
  const openModal = () => {
    showModal = true;
  };
  const closeModal = () => {
    showModal = false;
  };
</script>

<svelte:head>
  <title>Inventory</title>
  <meta name="description" content="Inventory page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
  <div class="container-fluid">
    {#if showModal}
      <Modal on:close={closeModal}>
        <form action="?/addItem" method="post">
          <div class="formPage" class:show={proceededClickCount < 1}>
            <h3 class="card__title mb-3">Add An Item</h3>
            <input
              class="card__list__item__input text-left fs-lg"
              type="text"
              value="Product Name Here"
              placeholder="Type here"
              name="product_name"
              required
            />
            <h3 class="card__title mt-4">Details</h3>
            <div class="card__list">
              <div class="card__list__item">
                <p class="card__list__item__text">Price Paid</p>
                <div
                  style="display: flex; align-items: center; max-width: 95px;"
                >
                  <span class="prefix">₤</span>
                  <input
                    class="card__list__item__input"
                    type="number"
                    value="123.45"
                    step="0.01"
                    placeholder="Type here"
                    required
                    name="price_paid"
                  />
                </div>
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Size</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  value="UK 10.5"
                  placeholder="Type here"
                  name="size"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Quantity</p>
                <input
                  class="card__list__item__input"
                  type="number"
                  bind:value={itemCount}
                  placeholder="Type here"
                  name="quantity"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Payment Method</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  value="Card"
                  placeholder="Type here"
                  name="payment_method"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Listed On Marketplace</p>
                <select
                  class="card__list__item__input"
                  name="listed_on_marketplace"
                  required
                >
                  <option value="True" selected>True</option>
                  <option value="False">False</option>
                </select>
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Listed On</p>
                <div>
                  <input
                    bind:checked={lacedListed}
                    type="checkbox"
                    id="laced"
                    name="Laced"
                    value="laced"
                  />
                  <label for="laced">Laced</label><br />
                  <input
                    bind:checked={stockxListed}
                    type="checkbox"
                    id="stockx"
                    name="StockX"
                    value="stockx"
                  />
                  <label for="stockx">StockX</label><br />
                  <input
                    bind:checked={goatListed}
                    type="checkbox"
                    id="goat"
                    name="Goat"
                    value="goat"
                  />
                  <label for="goat">Goat</label><br />
                  <input
                    bind:checked={eBayListed}
                    type="checkbox"
                    id="ebay"
                    name="eBay"
                    value="ebay"
                  />
                  <label for="ebay">eBay</label><br />
                </div>
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Local Market Price</p>
                <input
                  class="card__list__item__input"
                  type="number"
                  value="123.45"
                  step="0.01"
                  placeholder="Type here"
                  name="local_market_price"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">Date Of Purchase</p>
                <!-- Put value like YYYY-MM-DD format -->
                <input
                  class="card__list__item__input"
                  type="date"
                  value="2024-01-01"
                  name="date"
                  required
                />
              </div>
              <div class="card__list__item">
                <p class="card__list__item__text">SKU</p>
                <input
                  class="card__list__item__input"
                  type="text"
                  value="CW1590-001"
                  name="sku"
                  required
                  placeholder="Type here"
                />
              </div>
            </div>
            {#if goatListed || eBayListed || stockxListed}
              <button
                on:click={incrementProceededClickCount}
                type="button"
                class="btn btn--primary w-100">Proceed to Listings</button
              >
            {:else}
              <button type="submit" class="btn btn--primary w-100"
                >Add to Inventory</button
              >
            {/if}
          </div>
          <div class="formPage" class:show={proceededClickCount >= 1}>
            <h3 class="card__title mb-3">Add Listings</h3>
            <h3 class="card__title mt-4">Details</h3>
            <div class="card__list">
              {#if goatListed}
                <div class="card__list__item">
                  <p class="card__list__item__text">Goat</p>
                  <input
                    class="card__list__item__input"
                    type="number"
                    placeholder="Type here"
                    max={itemCount - eBayListings - stockXListings}
                    bind:value={goatListings}
                    required
                  />
                  <div>
                    {#each { length: goatListings } as _, i}
                      <input
                        class="card__list__item__input"
                        type="text"
                        placeholder="Listing ID"
                        name="goat[]"
                        required
                      />
                    {/each}
                  </div>
                </div>
              {/if}

              {#if stockxListed}
                <div class="card__list__item">
                  <p class="card__list__item__text">StockX</p>
                  <input
                    class="card__list__item__input"
                    type="number"
                    placeholder="Type here"
                    max={itemCount - goatListings - eBayListings}
                    bind:value={stockXListings}
                    required
                  />
                  <div>
                    {#each { length: stockXListings } as _, i}
                      <input
                        class="card__list__item__input"
                        type="text"
                        name="stockx[]"
                        placeholder="Listing ID"
                        required
                      />
                    {/each}
                  </div>
                </div>
              {/if}

              {#if eBayListed}
                <div class="card__list__item">
                  <p class="card__list__item__text">eBay</p>
                  <input
                    class="card__list__item__input"
                    type="number"
                    placeholder="Type here"
                    name="ebay[]"
                    max={itemCount - goatListings - stockXListings}
                    bind:value={eBayListings}
                    required
                  />
                  <div>
                    {#each { length: eBayListings } as _, i}
                      <input
                        class="card__list__item__input"
                        type="text"
                        placeholder="Offer ID"
                        required
                      />
                    {/each}
                  </div>
                </div>
              {/if}
              <button type="submit" class="btn btn--primary w-100"
                >Add to Inventory</button
              >
            </div>
          </div>
        </form>
      </Modal>
    {/if}
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th colspan="2">NAME / SKU</th>
            <th>Paid Price</th>
            <th>Market Price</th>
            <th>Profit</th>
            <th>Tags</th>
            <th>Last Edited</th>
            <th>
              <div class="d-flex align-items-center justify-content-xl-end">
                <div class="search-wrapper flex-shrink-0">
                  {#if showSearchbar}
                    <input
                      type="search"
                      class="search-wrapper__input"
                      bind:this={searchbar}
                      on:input={handleInventorySearch}
                      on:blur={handleSearchbarHide}
                    />
                  {:else}
                    <button
                      type="button"
                      class="search-wrapper__icon"
                      aria-label="Open search"
                      on:click={handleSearchbarShow}
                    >
                      <svelte:component this={SearchIcon} />
                    </button>
                  {/if}
                </div>
                <button
                  type="button"
                  class="icon-btn flex-shrink-0"
                  aria-label="Open modal"
                  on:click={openModal}
                >
                  <svelte:component this={PlusIcon} />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each displayedInventorys as inventory (inventory.inventoryId)}
            <tr>
              <td data-th="UPC">{inventory.upc}</td>
              <td data-th="SKU" class="white-space-unset">{inventory.sku}</td>
              <td data-th="Paid Price">{inventory.paidPrice}</td>
              <td data-th="Market Price">{inventory.marketPrice}</td>
              <td data-th="Profit">{inventory.profit}</td>
              <td data-th="Tags">
                <div class="tag-group">
                  {#each inventory.tags as tag, index (index)}
                    <span class="tag-btn" style={`--_tag-color: ${tag.color}`}
                      >{tag.name}</span
                    >
                  {/each}
                </div>
              </td>
              <td data-th="Last Edited">{inventory.lastEdited}</td>
              <td data-th="Actions" class="text-right">
                <div>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Open options"
                  >
                    <svelte:component this={DotsIcon} />
                  </button>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Remove item"
                    on:click={() =>
                      handleInventoryDataRemove(inventory.inventoryId)}
                  >
                    <svelte:component this={MinusIcon} />
                  </button>
                </div>
              </td>
            </tr>
          {:else}
            <tr>
              <td data-th="Search Result" colspan="1000" class="text-center"
                ><h3>No data found</h3></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div
      class="mt-3 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5"
    >
      {#each groupData as group (group.groupId)}
        <div class="col mt-4">
          <div class="group-card">
            <button
              type="button"
              class="btn-close"
              aria-label="Remove item"
              on:click={() => handleGroupDataRemove(group.groupId)}
            >
              <svelte:component this={CloseIcon} />
            </button>
            <div class="row align-items-center">
              <div class="col-md text-center">
                <figure class="group-card__figure mx-auto">
                  <img
                    class="group-card__figure__bg"
                    src={group.image === ""
                      ? "https://pub-abf1251d01434e569bdd37c83c30b0af.r2.dev/Logo%20(1).png"
                      : group.image}
                    alt="Item Image"
                    width="58"
                    height="58"
                    loading="lazy"
                    draggable="false"
                  />
                </figure>
                <h3 class="group-card__title my-2">{group.title}</h3>
                <p class="group-card__text">{group.itemsNumber}</p>
              </div>
              <div class="col-md-auto">
                <div class="group-card__list success">
                  {group.positiveCount}
                </div>
                <div class="group-card__list danger">{group.negativeCount}</div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .table-responsive {
    overflow-x: auto;
  }

  .table {
    width: 100%;
  }

  table {
    --_padding-block: 12px;
  }

  table,
  th,
  td {
    border-collapse: collapse;
  }

  thead th {
    color: #d9d9d9;
    text-align: left;
    border-bottom: 1px solid #ffffff;
  }
  thead th:last-of-type {
    min-width: 118px;
  }
  th,
  td {
    font-size: 14px;
    font-weight: 600;
    padding: var(--_padding-block) 15px;
    white-space: nowrap;
  }

  .search-wrapper {
    max-width: 80px;
  }

  .icon-btn {
    display: inline-block;
    border: 0;
    background-color: transparent;
    padding: 3px;
    font-size: 18px;
  }

  .group-card {
    position: relative;
    background-color: #000000;
    padding: 12px 20px;
    border: 1px solid var(--color-border);
    border-radius: 14px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .group-card__figure,
  .group-card__list::before {
    border-radius: 50rem;
  }

  .group-card__figure {
    position: relative;
    width: 58px;
    height: 58px;
    overflow: hidden;
    display: block;
  }

  .group-card__figure__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .group-card__title,
  .group-card__list::before {
    font-weight: 600;
  }

  .group-card__title {
    font-size: 18px;
  }

  .group-card__text {
    font-size: 9px;
    font-weight: 500;
  }

  .group-card__list {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 10px;
    font-size: 15px;
  }

  .group-card__list::before {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    content: "";
    width: 6px;
    height: 6px;
    background-color: #ffffff;
  }

  .group-card__list.success::before {
    background-color: #05ea86;
  }
  .group-card__list.danger::before {
    background-color: #ea0505;
  }

  @media (max-width: 1199.98px) {
    thead th:not(:last-of-type) {
      display: none;
    }
    tbody td {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      gap: 5px;
    }
    tbody td::before {
      content: attr(data-th) " : ";
      color: var(--color-primary);
    }
    tbody tr:not(:first-of-type) td:first-of-type {
      border-top: 1px solid #ffffff;
    }
  }
  @media (min-width: 1200px) {
    tbody tr:first-child td {
      padding-top: calc(var(--_padding-block) * 2);
    }
  }

  .formPage {
    display: none;
  }
  .formPage.show {
    display: block;
  }
</style>
