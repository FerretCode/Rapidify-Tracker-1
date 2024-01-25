<script>
	import { page } from '$app/stores';
	import StatisticsIcon from '../assets/icons/navbar-icon/StatisticsIcon.svelte';
	import InventoryIcon from '../assets/icons/navbar-icon/InventoryIcon.svelte';
	import ExpensesIcon from '../assets/icons/navbar-icon/ExpensesIcon.svelte';
	import SalesIcon from '../assets/icons/navbar-icon/SalesIcon.svelte';
	import ToolsIcon from '../assets/icons/navbar-icon/ToolsIcon.svelte';
	import MarketIcon from '../assets/icons/navbar-icon/MarketIcon.svelte';
	import SettingsIcon from '../assets/icons/navbar-icon/SettingsIcon.svelte';

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
</script>
<!-- <a href="/sverdle" aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>Sverdle</a> -->

<aside class="sidebar">
	<nav class="sidebar__nav">
		{#each sidebarMenues as menue }
			<a href={menue.path} class="nav__link" aria-current={$page.url.pathname === menue.path ? 'page' : undefined}>
				<span class="nav__link__icon">
					<svelte:component this={menue.icon} />
				</span>
				<span class="nav__link__text">{menue.name}</span>
			</a>
		{/each}
	</nav>
</aside>

<style>
	.sidebar{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #000000;
		padding: 50px;
	}

	.sidebar__nav{
		display: flex;
		flex-direction: column;
		gap: 40px;
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
</style>