<script>
    import Card from "$lib/components/Card.svelte";

    let showInvoiceGeneratorNextStep = false;
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
                    <form action="#!">
                        <div class="card__list">
                            <div class="card__list__item">
                                <p class="card__list__item__text">First Name</p>
                                <input class="card__list__item__input" type="text" value="Developer" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Last Name</p>
                                <input class="card__list__item__input" type="text" value="Zahid" placeholder="Type here" readonly>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Email / Catchall Domain</p>
                                <input class="card__list__item__input" type="text" value="loremipsum.com" placeholder="Type here">
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Address Line 1</p>
                                <input class="card__list__item__input" type="text" value="123 Grove Street" placeholder="Type here">
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Address Line 2</p>
                                <input class="card__list__item__input" type="text" value="Rapidify Told You First" placeholder="Type here">
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Postal Code</p>
                                <input class="card__list__item__input" type="text" value="SW11 1AA" placeholder="Type here">
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Num. Of Randomises</p>
                                <input class="card__list__item__input" type="text" value="50" placeholder="Type here">
                            </div>
                        </div>
                        <button type="submit" class="btn btn--primary w-100">Randomise</button>
                    </form>
                </Card>
            </div>
            <div class="col-xxl-4 col-xl-6 col-12 offset-xxl-1">
                <Card>
                    <h3 class="card__title">Invoice Generator</h3>
                    <form action="#!">
                        {#if showInvoiceGeneratorNextStep}
                            <div aria-label="Form last step">
                                <div class="card__list">
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Your Name</p>
                                        <input class="card__list__item__input" type="text" value="Lorem" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Address Line 1</p>
                                        <input class="card__list__item__input" type="text" value="Zahid" placeholder="123 Grove Street" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Address Line 2</p>
                                        <input class="card__list__item__input" type="text" value="loremipsum.com" placeholder="Rapidify Told You First" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Postal Code</p>
                                        <input class="card__list__item__input" type="text" value="SW11 1AA" placeholder="Type here" required>
                                    </div>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn--primary" on:click={()=> showInvoiceGeneratorNextStep = !showInvoiceGeneratorNextStep}>Previous Page</button>
                                    <button type="submit" class="btn btn--primary">Generate</button>
                                </div>
                            </div>
                            {:else}
                            <div aria-label="Form first step">
                                <div class="card__list">
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Billing Name</p>
                                        <input class="card__list__item__input" type="text" value="Lorem" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Address Line 1</p>
                                        <input class="card__list__item__input" type="text" value="Zahid" placeholder="123 Grove Street" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Address Line 2</p>
                                        <input class="card__list__item__input" type="text" value="loremipsum.com" placeholder="Rapidify Told You First" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Postal Code</p>
                                        <input class="card__list__item__input" type="text" value="SW11 1AA" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Product Name</p>
                                        <input class="card__list__item__input" type="text" value="Jordan 1 Off White Chicago" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Quantity</p>
                                        <input class="card__list__item__input" type="text" value="1" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Price Per Item</p>
                                        <input class="card__list__item__input" type="text" value="£500.00" placeholder="Type here" required>
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
                                        <input class="card__list__item__input" type="text" value="False" placeholder="Type here" required>
                                    </div>
                                    <div class="card__list__item">
                                        <p class="card__list__item__text">Invoice Number</p>
                                        <input class="card__list__item__input" type="text" value="False" placeholder="Type here" required>
                                    </div>
                                </div>
                                <button type="button" class="btn btn--primary w-100" on:click={()=> showInvoiceGeneratorNextStep = !showInvoiceGeneratorNextStep}>Next Page</button>
                            </div>
                        {/if}
                        
                    </form>
                </Card>
            </div>
        </div>
    </div>
</section>