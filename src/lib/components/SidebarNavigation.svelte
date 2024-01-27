<script>
	import { page } from '$app/stores';
	import logo from '$lib/assets/images/logo/logo.png';
	import CloseIcon from '$lib/assets/icons/CloseIcon.svelte';
	import StatisticsIcon from '$lib/assets/icons/navbar-icon/StatisticsIcon.svelte';
	import InventoryIcon from '$lib/assets/icons/navbar-icon/InventoryIcon.svelte';
	import ExpensesIcon from '$lib/assets/icons/navbar-icon/ExpensesIcon.svelte';
	import SalesIcon from '$lib/assets/icons/navbar-icon/SalesIcon.svelte';
	import ToolsIcon from '$lib/assets/icons/navbar-icon/ToolsIcon.svelte';
	import MarketIcon from '$lib/assets/icons/navbar-icon/MarketIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/navbar-icon/SettingsIcon.svelte';

	const sidebarMenues = [
		{
			path: '/',
			name: 'Statistics',
			icon: StatisticsIcon
		},
		{
			path: '/inventory',
			name: 'Inventory',
			icon: InventoryIcon
		},
		{
			path: '/expenses',
			name: 'Expenses',
			icon: ExpensesIcon
		},
		{
			path: '/sales',
			name: 'Sales',
			icon: SalesIcon
		},
		{
			path: '/tools',
			name: 'Tools',
			icon: ToolsIcon
		},
		{
			path: '/market',
			name: 'Market',
			icon: MarketIcon
		},
		{
			path: '/settings',
			name: 'Settings',
			icon: SettingsIcon
		},
	];

	let sidebar;

	const handleMenuHideOnClick = ()=>{
		sidebar.classList.remove('show')
	}
</script>
<!-- <a href="/sverdle" aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>Sverdle</a> -->

<aside class="sidebar" bind:this={sidebar}>
	<div class="sidebar__header">
		<button type="button" class="btn-close" on:click={handleMenuHideOnClick}>
			<svelte:component this={CloseIcon} />
		</button>
		<a href="/" class="sidebar__logo" on:click={handleMenuHideOnClick}>
			<img src={logo} alt="logo">
		</a>
	</div>
	<nav class="sidebar__nav">
		{#each sidebarMenues as menue }
			<a href={menue.path} class="nav__link" aria-current={$page.url.pathname === menue.path ? 'page' : undefined} on:click={handleMenuHideOnClick}>
				<span class="nav__link__icon">
					<svelte:component this={menue.icon} />
				</span>
				<span class="nav__link__text">{menue.name}</span>
			</a>
		{/each}
	</nav>
</aside>

<style>
	:global(:root) {
		--sidebar-width: 277px;
	}

	.sidebar{
		--_gap: 40px;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		padding: 50px;
		transition:
			box-shadow 0.25s linear,
			transform 0.25s ease-in-out;
		z-index: 999;
	}

	.sidebar__header{
		text-align: center;
		margin-bottom: var(--_gap);
		z-index: 1;
	}

	.sidebar__header .btn-close{
		position: absolute;
		top: 15px;
		right: 15px;
	}

	.sidebar__logo{
		display: inline-block;
		padding: 2px;
	}

	.sidebar__nav{
		display: flex;
		flex-direction: column;
		gap: var(--_gap);
	}

	.nav__link{
		display: inline-flex;
		align-items: center;
		gap: 15px;
		color: #7B7B7B;
		padding: 12px 32px;
		border: 1.5px solid transparent;
		border-radius: 50rem;
		transition: all .25s ease-in-out;
	}

	.nav__link[aria-current="page"],
	.nav__link:hover,
	.nav__link:focus-visible
	{
		color: #ffffff;
		background-color: rgba(7, 6, 6, 0.8);
	}
	
	.nav__link[aria-current="page"]{
		border-color: #EFEEEB;
	}
	
	.nav__link__icon{
		font-size: 22px;
	}

	.nav__link__text{
		font-size: 15px;
		font-weight: 600;
	}

	@media (max-width: 991.98px){
		:global(:root) {
			--sidebar-width: 0;
		}

		.sidebar{
			--_gap: 20px;
			background-color: #000000;
		}

		.sidebar:not(.show){
			transform: translateX(-100%);
		}
	}

	@media (min-width: 992px){
		.sidebar__header .btn-close{
			display: none;
		}
	}
</style>