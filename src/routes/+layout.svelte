<script>
  import Header from "$lib/components/Header.svelte";
  import SidebarNavigation from "$lib/components/SidebarNavigation.svelte";
  import "$lib/assets/plugins/bootstrap/css/bootstrap-grid.min.css";
  import "$lib/assets/css/styles.css";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="app">
  <Header
    username={data.discord_user.username}
    avatarUrl={data.discord_user.avatar_url}
  />
  <SidebarNavigation />

  <main class="main">
    <slot />
  </main>
</div>

<style>
  .main {
    margin-left: var(--sidebar-width, 0px);
    padding-left: var(--container-inline-padding, 0px);
    padding-right: var(--container-inline-padding, 0px);
  }
</style>
