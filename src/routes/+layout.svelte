<script>
	import '../app.pcss';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Banner } from 'flowbite-svelte';
	import {DeviceDesktopDown} from 'svelte-tabler';
</script>

<svelte:head>
	<title>Besin Hesaplayıcı</title>
</svelte:head>

<Navbar class="mb-6">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Besin Hesaplayıcı</span
		>
	</NavBrand>
	<NavUl class="order-1 ml-auto md:order-none">
		<NavLi href="/">Tarif</NavLi>
		<NavLi href="/">Yemek</NavLi>
	</NavUl>
	<div class="flex items-center">
		<DarkMode />
		<NavHamburger class1="w-full md:flex md:w-auto" />
	</div>
</Navbar>

<slot />
<Banner id="bottom-banner" position="absolute" bannerType="bottom">
  <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
    <span class="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600">
	<DeviceDesktopDown class="w-4 h-4 text-gray-500 dark:text-gray-400" />

      <span class="sr-only">Uygulama olarak yükle</span>
    </span>
    <span>
      Uygulama olarak yükleyerek kolay erişim sağlayabilirsiniz. 
    </span>
  </p>
</Banner>