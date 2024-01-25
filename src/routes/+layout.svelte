<script>
	import SidebarNavigation from '$lib/components/SidebarNavigation.svelte';
	import '$lib/assets/css/styles.css';
</script>

<div class="app">
	<SidebarNavigation />

	<main class="main">
		<slot />
	</main>
</div>

<style>
</style>
