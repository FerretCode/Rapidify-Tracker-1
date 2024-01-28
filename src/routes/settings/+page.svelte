<script>
    import Card from "$lib/components/Card.svelte";
    import FolderIcon from "$lib/assets/icons/FolderIcon.svelte"
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
                            <h4 class="card__list__item__title">Logged In</h4>
                        </div>
                        <div class="card__list__item">
                            <p class="card__list__item__text">eBay</p>
                            <h4 class="card__list__item__title">Logged In</h4>
                        </div>
                        <div class="card__list__item">
                            <p class="card__list__item__text">Goat / Alias</p>
                            <h4 class="card__list__item__title">Logged In</h4>
                        </div>
                        <div class="card__list__item">
                            <p class="card__list__item__text">Laced</p>
                            <h4 class="card__list__item__title">Logged In</h4>
                        </div>
                        <div class="card__list__item">
                            <p class="card__list__item__text">Discord Webhook</p>
                            <h4 class="card__list__item__title">https://discord.com/api/5..</h4>
                        </div>
                        <div>
                            <p class="card__list__item__text mb-3">Import Inventory</p>
                            <label class="custom-uploader">
                                <input type="file" name="inventory" class="custom-uploader__input" accept=".csv">
                                <span class="custom-uploader__btn">
                                    <svelte:component this={FolderIcon} />
                                </span>
                            </label>
                            <p class="card__list__item__text mt-2"><small>*only CSV files will be accepted</small></p>
                        </div>
                    </div>
                    <a href="#!" class="btn btn--dark w-100 my-3">Export Inventory</a>
                    <a href="#!" class="btn btn--primary w-100">Log Out Of Accounts</a>
                </Card>
            </div>
        </div>
    </div>
</section>