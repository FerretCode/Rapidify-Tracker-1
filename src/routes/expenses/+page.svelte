<script>
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
	<title>Expenses</title>
	<meta name="description" content="Expenses page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-xxl-4 col-xl-6 col-12 mb-4 mb-xl-0">
                <Card>
                    <h3 class="card__title">Add Recurring Expenses</h3>
                    <form action="#!">
                        <div class="card__list">
                            <div class="card__list__item">
                                <p class="card__list__item__text">First Name</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Servers</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Software</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Communities / Groups</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Accounts</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Other (1)</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Other (2)</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Other (3)</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                            <div class="card__list__item">
                                <p class="card__list__item__text">Miscellaneous</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn--primary w-100">Add To Expenses</button>
                    </form>
                </Card>
            </div>
            <div class="col-xxl-4 col-xl-6 col-12 offset-xxl-1">
                <Card>
                    <h3 class="card__title">Add One Time Expense</h3>
                    <form action="#!">
                        <div class="card__list">
                            <div class="card__list__item">
                                <p class="card__list__item__text">Amount</p>
                                <input class="card__list__item__input" type="text" value="£100.00" placeholder="Type here" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn--primary w-100">Add To Expenses</button>
                    </form>
                </Card>
            </div>
        </div>
    </div>
</section>