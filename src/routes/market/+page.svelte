<script>
    import SearchIcon from "$lib/assets/icons/SearchIcon.svelte";
    let productsData = Array(24).fill().map((_, index) => ({
        productId: index,
        image: '/assets/images/product/product.jpg',
        title: '5x Ugg Tazz Slipper Chestnut Womens',
        price: '£123.45 Per Pair',
        sku: 'SKU: 1122553-CHE',
        discordUsername: 'Username Goes Here',
    }));

    let showUsernames = {};
    const handleShowUsername = (productId) => {
        showUsernames[productId] = !showUsernames[productId];
    }
</script>

<svelte:head>
	<title>Market</title>
	<meta name="description" content="Market page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
    <div class="container-fluid">
        <div class="d-flex align-items-center mb-3">
            <h1 class="section-title">Global Marketplace</h1>
            <div class="search-wrapper search-wrapper--icon-left">
                <input type="search" class="search-wrapper__input">
                <button type="button" class="search-wrapper__icon">
                    <svelte:component this={SearchIcon} />
                </button>
            </div>
        </div>
        <div class="row">
            {#each productsData as product (product.productId)}
                <div class="col-xxl-2 col-xl-3 col-md-4 col-sm-6 mt-3">
                    <article class="product-card">
                        <figure class="product-card__figure">
                            <img src={product.image} alt="product" class="product-card__figure__bg" loading="lazy" draggable="false">
                        </figure>
                        <div class="product-card__body">
                            <h3 class="product-card__text">5x Ugg Tazz Slipper Chestnut Womens</h3>
                            <p class="product-card__text">£123.45 Per Pair</p>
                            <p class="product-card__text">SKU: 1122553-CHE</p>
                            <button type="button" class="btn btn--primary w-100" on:click={() => handleShowUsername(product.productId)}>
                                {#if showUsernames[product.productId]}
                                    <span>{product.discordUsername}</span>
                                {:else}
                                    Click To See User Discord
                                {/if}
                            </button>
                        </div>
                    </article>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .search-wrapper{
        --_padding-inline: 8px;
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 var(--_padding-inline);
    }

    .search-wrapper__icon,
    .search-wrapper__input
    {
        background-color: transparent;
    }

    .search-wrapper__icon{
        color: #B6B6B6;
        position: absolute;
        display: inline-block;
        border: 0;
        font-size: 17px;
    }

    .search-wrapper--icon-left .search-wrapper__icon{
        left: var(--_padding-inline);
    }

    .search-wrapper__input{
        padding: 5px var(--_padding-inline);
        border: 0;
        border-bottom: 1px solid #ffffff;
    }

    .section-title{
        color: #B6B6B6;
        font-size: 24px;
        font-weight: 600;
    }

    .product-card{
        padding: 14px 11px;
        background-color: #1E1E1E;
        border-radius: 12px;
    }
    
    .product-card__figure{
        position: relative;
        padding-top: 49%;
        border-radius: 5px;
        overflow: hidden;
    }

    .product-card__figure__bg{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .product-card__text{
        font-size: 10px;
        font-weight: 500;
    }

    .product-card__body > *{
        margin-top: 8px;
    }

    .product-card__body .btn{
        font-size: 12px;
        padding: 10px;
        border-radius: 5.5px;
    }
</style>