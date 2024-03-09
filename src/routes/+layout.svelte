<script>
	import '../app.pcss';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
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
