<script>
    import SearchIcon from "$lib/assets/icons/SearchIcon.svelte";
    import PlusIcon from "$lib/assets/icons/PlusIcon.svelte";
    import MinusIcon from "$lib/assets/icons/MinusIcon.svelte";
    import DotsIcon from "$lib/assets/icons/DotsIcon.svelte";
    import CloseIcon from "$lib/assets/icons/CloseIcon.svelte";

    let inventoryData = Array(12).fill().map((_, index) =>{
        if(index % 2){
            return {
                inventoryId: index,
                upc: `Product ${index + 1}`,
                sku: `Off White Air Jordan ${index + 1} “Chicago”`,
                paidPrice: '£123.45 Per Pair',
                marketPrice: '£1,500.00',
                profit: '£1,000.00',
                lastEdited: '22/01/2024',
                tags: [
                    {
                        color: '#FF0000',
                        name: 'Unlisted'
                    },
                    {
                        color: '#FF8C8C',
                        name: 'UK 5'
                    },
                    {
                        color: '#BD00FF',
                        name: 'Card'
                    },
                    {
                        color: '#63FFAB',
                        name: 'Multiple Pairs'
                    },
                    {
                        color: '#FF0000',
                        name: 'Old Item'
                    }
                ]
            }

        }else{
            return {
                inventoryId: index,
                upc: `Product ${index + 1}`,
                sku: `Off White Air Jordan ${index + 1} “Chicago”`,
                paidPrice: '£123.45 Per Pair',
                marketPrice: '£1,500.00',
                profit: '£1,000.00',
                lastEdited: '22/01/2024',
                tags: [
                    {
                        color: '#0AFF22',
                        name: 'Listed'
                    },
                    {
                        color: '#FF8C8C',
                        name: 'UK 10'
                    },
                    {
                        color: '#00E0FF',
                        name: 'PayPal'
                    },
                    {
                        color: '#FFF500',
                        name: 'One Pair'
                    },
                    {
                        color: '#FFF500',
                        name: 'New Item'
                    }
                ]
            }
        }
    });

    let groupData = Array(5).fill().map((_, index)=>({
        groupId: index,
        image: '/assets/images/group-logo.png',
        title: `Group ${index + 1}`,
        itemsNumber: 'Number Of Items Here',
        positiveCount: 50,
        negativeCount: 50,
    }))
    
    let searchbar;
    let showSearchbar = false;
    const handleSearchbarShow = ()=>{
        showSearchbar = true;
        setTimeout(()=>{
            searchbar.focus();
        },0)
    };
    const handleSearchbarHide = ()=>{
        if(searchbar.value.trim() !== ''){
            showSearchbar = true
        }else{
            showSearchbar = false
        }
    };

    let displayedInventorys = [...inventoryData];
    const handleInventorySearch = ()=>{
        let currentTypedValue = searchbar.value.trim().toLowerCase().replace(/\s/g, '');
        if(currentTypedValue !== ''){
            displayedInventorys = inventoryData.filter(item=>{
                const searchableProperties = [
                    'upc',
                    'sku',
                    'paidPrice',
                    'marketPrice',
                    'profit',
                    'lastEdited',
                    'tags'
                ];

                return searchableProperties.some(prop => {
                    if (Array.isArray(item[prop])) {
                        return item[prop].some(tag => tag.name.toLowerCase().replace(/\s/g, '').includes(currentTypedValue.toLowerCase()));
                    } else {
                        return item[prop].toString().toLowerCase().replace(/\s/g, '').includes(currentTypedValue.toLowerCase());
                    }
                });
            });
        }else{
            displayedInventorys = [...inventoryData];
        }
    }

    const handleGroupDataRemove = (id)=>[
        groupData = groupData.filter(item=> item.groupId !== id)
    ]
</script>

<svelte:head>
	<title>Market</title>
	<meta name="description" content="Market page" />
</svelte:head>

<section class="pt-5 pt-xl-0 pb-5">
    <div class="container-fluid">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th colspan="2">UPC / SKU</th>
                        <th>Paid Price</th>
                        <th>Market Price</th>
                        <th>Profit</th>
                        <th>Tags</th>
                        <th>Last Edited</th>
                        <th class="d-flex align-items-center justify-content-end">
                            <div class="search-wrapper flex-shrink-0">
                                {#if showSearchbar}
                                    <input type="search" class="search-wrapper__input" bind:this={searchbar} on:input={handleInventorySearch} on:blur={handleSearchbarHide}>
                                {:else}
                                    <button type="button" class="search-wrapper__icon" on:click={handleSearchbarShow}>
                                        <svelte:component this={SearchIcon} />
                                    </button>
                                {/if}
                            </div>
                            <button type="button" class="icon-btn flex-shrink-0">
                                <svelte:component this={PlusIcon} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each displayedInventorys as inventory (inventory.inventoryId)}
                        <tr>
                            <td>{inventory.upc}</td>
                            <td>{inventory.sku}</td>
                            <td>{inventory.paidPrice}</td>
                            <td>{inventory.marketPrice}</td>
                            <td>{inventory.profit}</td>
                            <td class="tag-group">
                                {#each inventory.tags as tag, index (index)}
                                    <span class="tag-btn" style={`--_tag-color: ${tag.color}`}>{tag.name}</span>
                                {/each}
                            </td>
                            <td>{inventory.lastEdited}</td>
                            <td class="text-right">
                                <button type="button" class="icon-btn">
                                    <svelte:component this={DotsIcon} />
                                </button>
                                <button type="button" class="icon-btn">
                                    <svelte:component this={MinusIcon} />
                                </button>
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="1000" class="text-center"><h3>No data found</h3></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="mt-3 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
            {#each groupData as group (group.groupId)}
                <div class="col mt-4">
                    <div class="group-card">
                        <button type="button" class="btn-close" on:click={()=> handleGroupDataRemove(group.groupId)}>
                            <svelte:component this={CloseIcon} />
                        </button>
                        <div class="row align-items-center">
                            <div class="col-md text-center">
                                <figure class="group-card__figure mx-auto">
                                    <img class="group-card__figure__bg" src={group.image} alt="logo" width="58" height="58" loading="lazy" draggable="false">
                                </figure>
                                <h3 class="group-card__title my-2">{group.title}</h3>
                                <p class="group-card__text">Number Of Items Here</p>
                            </div>
                            <div class="col-md-auto">
                                <div class="group-card__list success">{group.positiveCount}</div>
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
    .table-responsive{
        overflow-x: auto;
    }

    .table{
        width: 100%;
    }

    table{
        --_padding-block: 12px;
    }

    table,
    th,
    td{
        border-collapse: collapse;
    }

    thead th{
        color: #D9D9D9;
        text-align: left;
        border-bottom: 1px solid #ffffff;
        white-space: nowrap;
    }
    th,
    td{
        font-size: 15px;
        font-weight: 600;
        padding: var(--_padding-block) 5px;
    }
    
    tbody tr:first-child td{
        padding-top: calc(var(--_padding-block) * 2);
    }

    .search-wrapper{
        max-width: 80px;
    }

    .icon-btn{
        display: inline-block;
        border: 0;
        background-color: transparent;
        padding: 3px;
        font-size: 18px;
    }

    .group-card{
        position: relative;
        background-color: #000000;
        padding: 12px 20px;
        border: 1px solid var(--color-border);
        border-radius: 14px;
    }

    .btn-close{
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .group-card__figure,
    .group-card__list::before
    {
        border-radius: 50rem;
    }

    .group-card__figure{
        position: relative;
        width: 58px;
        height: 58px;
        overflow: hidden;
        display: block;
    }

    .group-card__figure__bg{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .group-card__title,
    .group-card__list::before
    {
        font-weight: 600;
    }

    .group-card__title{
        font-size: 18px;
    }

    .group-card__text{
        font-size: 9px;
        font-weight: 500;
    }

    .group-card__list{
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
    }

    .group-card__list::before{
        flex-shrink: 0;
        content: '';
        width: 6px;
        height: 6px;
        background-color: #ffffff;
    }

    .group-card__list.success::before{
        background-color: #05EA86;
    }
    .group-card__list.danger::before{
        background-color: #EA0505;
    }
</style>