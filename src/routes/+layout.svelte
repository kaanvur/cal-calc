<script>
	import '../app.pcss';
	import { DarkMode } from 'flowbite-svelte';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Toast,
		Footer,
		FooterCopyright
	} from 'flowbite-svelte';
	import { DeviceDesktopDown } from 'svelte-tabler';

	let open = true;
	let counter = 6;
	setTimeout(() => {
		open = false;
	}, counter * 1000);
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

<Footer class="my-10">
	<hr class="my-6 border-gray-200 dark:border-gray-700 mx-auto lg:my-8" />
	<FooterCopyright href="https://kaanvurgun.com/" target="_blank" by="Kaan Vurgun" spanClass="block text-sm text-gray-500 text-center dark:text-gray-400" />
</Footer>
<Toast position="bottom-right" bind:open>
	<DeviceDesktopDown slot="icon" />
	Uygulama olarak yükleyerek kolay erişim sağlayabilirsiniz.
</Toast>
