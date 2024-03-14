<script>
  import SearchIcon from "$lib/assets/icons/SearchIcon.svelte";

  export let data;

  let productsData = data.inventory.map((item) => ({
    productId: item.id,
    image: item.image,
    title: item.name,
    price: `£${item.price} Per Pair`,
    sku: `SKU/Style: ${item.sku}`,
    discordUsername: "Username Goes Here",
  }));

  let displayedProducts = [...productsData];

  let showUsernames = {};
  const handleShowUsername = (productId) => {
    showUsernames[productId] = !showUsernames[productId];
  };

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

  const handleProductSearch = () => {
    let currentTypedValue = searchbar.value
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");
    if (currentTypedValue !== "") {
      displayedProducts = productsData.filter((item) =>
        item.title.toLowerCase().replace(/\s/g, "").includes(currentTypedValue)
      );
    } else {
      displayedProducts = [...productsData];
    }
  };
</script>

<svelte:head>
  <title>Market</title>
  <meta name="description" content="Market page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
  <div class="container-fluid">
    <div class="d-flex align-items-center mb-3">
      <h1 class="section-title">Global Marketplace</h1>
      <div class="search-wrapper">
        {#if showSearchbar}
          <input
            type="search"
            class="search-wrapper__input"
            bind:this={searchbar}
            on:input={handleProductSearch}
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
    </div>
    <div class="row">
      {#each displayedProducts as product (product.productId)}
        <div class="col-xxl-2 col-xl-3 col-md-4 col-sm-6 mt-3">
          <article class="product-card">
            <figure class="product-card__figure">
              <img
                src={"https://secure-images.nike.com/is/image/DotCom/" +
                  product.sku}
                alt="product"
                class="product-card__figure__bg"
                height="105"
                loading="lazy"
                draggable="false"
              />
            </figure>
            <div class="product-card__body">
              <h2 class="product-card__text">{product.title}</h2>
              <p class="product-card__text">{product.price}</p>
              <p class="product-card__text">{product.sku}</p>
              <button
                type="button"
                class="btn btn--primary w-100"
                on:click={() => handleShowUsername(product.productId)}
              >
                {#if showUsernames[product.productId]}
                  <span>{product.discordUsername}</span>
                {:else}
                  Click To See User Discord
                {/if}
              </button>
            </div>
          </article>
        </div>
      {:else}
        <div class="col-12">
          <h2 class="text-center mt-4">No data found</h2>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-title {
    color: #b6b6b6;
    font-size: 24px;
    font-weight: 600;
  }

  .product-card {
    padding: 14px 11px;
    background-color: #1e1e1e;
    border-radius: 12px;
  }

  .product-card__figure {
    position: relative;
    padding-top: 49%;
    border-radius: 5px;
    overflow: hidden;
  }

  .product-card__figure__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .product-card__text {
    font-size: 10px;
    font-weight: 500;
  }

  .product-card__body > * {
    margin-top: 8px;
  }

  .product-card__body .btn {
    font-size: 12px;
    padding: 10px;
    border-radius: 5.5px;
  }
</style>
