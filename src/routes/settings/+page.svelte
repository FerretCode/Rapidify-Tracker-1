<script>
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Settings page" />
</svelte:head>

<section>
    <div class="container">
        <div class="row">
            <div class="col-lg-5 mx-auto">
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
                    </div>
                    <button type="button" class="btn btn--dark w-100">Export Inventory</button>
                    <a href="#!" class="btn btn--primary w-100">Log Out Of Accounts</a>
                </Card>
            </div>
        </div>
    </div>
</section>