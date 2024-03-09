<script lang="ts">
	import {
		Card,
		Button,
		Textarea,
		Select,
		Label,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		Tooltip
	} from 'flowbite-svelte';
	import { Mushroom, Pizza, Plant2, Salad, Sausage, Home, MichelinStar,InfoCircle } from 'svelte-tabler';

	import { t } from 'svelte-i18n';

	let textToTranslate =
		'1 sarımsak\n200gr makarna\n1 yemek kaşığı domates salçası\n1 çay kaşığı tuz';
	let translatedText = '';
	let targetLanguage = 'en';
	interface NutrientInfo {
		label: string;
		quantity: number;
		unit: string;
	}

	interface NutritionalInfo {
		totalNutrients: Record<string, NutrientInfo>;
		totalDaily: Record<string, NutrientInfo>;
		totalNutrientsKCal: Record<string, NutrientInfo>;
		healthLabels?: Array<string>;
		cuisineType?: Array<string>;
		mealType?: Array<string>;
		dishType?: Array<string>;
	}

	interface IconMap {
		[key: string]:
			| typeof Mushroom
			| typeof Plant2
			| typeof Sausage
			| typeof Pizza
			| typeof Home
			| typeof MichelinStar
			| typeof Salad;
	}

	let iconMap: IconMap = {
		ENERC_KCAL: Mushroom,
		PROCNT_KCAL: Plant2,
		FAT_KCAL: Sausage,
		CHOCDF_KCAL: Pizza,
		cuisineType: Home,
		mealType: MichelinStar,
		dishType: Salad
	};

	let nutritionalInfo: NutritionalInfo | null = null;

	async function handleTranslate() {
		try {
			const response = await fetch('/api/translate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					textToTranslate,
					targetLanguage,
					hasnutritionalinfo: true
				})
			});
			if (response.ok) {
				const data = await response.json();
				translatedText = data.translatedText;
				nutritionalInfo = data.nutritionalInfo;
			} else {
				const data = await response.json();
				nutritionalInfo = null;
				const errorMessage = data.error ? `Hata: ${data.error} <br>` : '';
				translatedText = `${errorMessage}${data.translatedText}`;
			}
		} catch (error) {
			nutritionalInfo = null;
			translatedText = 'Çeviri yapılamadı - Hata kodu: ' + error;
		}
	}
</script>

<div class="container mx-auto grid gap-6">
	<Card class="max-w-full">
		<Label>
			<span class="flex gap-2">
				Tarifini gir
				<Button pill={true} class="p-0" color="alternative"><InfoCircle/></Button>
				<Tooltip>Her satıra adet ya da gr şeklinde 1 ürün girin</Tooltip>
			</span>
				<Textarea
					class="mt-2"
					bind:value={textToTranslate}
					placeholder="Malzemeleri girin"
					rows="10"
				/>
		</Label>
		<Button class="my-4" on:click={handleTranslate}>İngilizceye çevir ve Değerleri getir</Button>
		<Label>
			Dil seç (deneme)
			<Select class="mt-2" bind:value={targetLanguage}>
				<option value="en">English</option>
				<option value="fr">French</option>
				<option value="tr">Turkish</option>
			</Select>
		</Label>
	</Card>
	<Card class="max-w-full text-sm text-gray-900 dark:text-gray-300">
		<p>Translated Text:</p>
		<p>{@html translatedText.replace(/\n/g, '<br>')}</p>
	</Card>
	{#if nutritionalInfo}
		<Card class="grid max-w-full">
			<Table class="shadow-2xl" striped={true} hoverable={true} shadow color="custom">
				<caption
					class="bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-orange-950/20 dark:text-white dark:md:bg-orange-900/20"
				>
					<div class="grid md:md:grid-cols-2">
						{#each Object.entries(nutritionalInfo.totalNutrientsKCal) as [key, value], index}
							<div
								class="border-b p-8 text-center even:border-e-0 md:border-e {index >=
								Object.entries(nutritionalInfo.totalNutrientsKCal).length - 2
									? 'md:border-b-0'
									: ''}"
							>
								<svelte:component this={iconMap[key]} size="40" class="mx-auto" />

								<h4>{$t(`${value.label}`)}</h4>
								<p class="text-base">{value.quantity} {value.unit}</p>
							</div>
						{/each}
					</div>
					<div>
						<hr />
						<h4 class="my-4">Sağlık Etiketleri</h4>
						<div class="flex flex-wrap gap-3">
							{#each nutritionalInfo.healthLabels || [] as label}
								<Badge>{label}</Badge>
							{/each}
						</div>
					</div>
					<div>
						<h4 class="my-4">Yemek Bilgisi:</h4>
						<ul class="grid grid-cols-3 divide-x text-center text-sm">
							{#each nutritionalInfo.cuisineType || [] as type}
								<li>
									<svelte:component this={iconMap['cuisineType']} size="30" class="mx-auto" />
									<h5>Mutfak</h5>
									<p>{type}</p>
								</li>
							{/each}
							{#each nutritionalInfo.mealType || [] as type}
								<li>
									<svelte:component this={iconMap['mealType']} size="30" class="mx-auto" />
									<h5>Yemek Turu</h5>
									<p>{type}</p>
								</li>
							{/each}
							{#each nutritionalInfo.dishType || [] as type}
								<li>
									<svelte:component this={iconMap['dishType']} size="30" class="mx-auto" />
									<h5>Yemek Tipi</h5>
									<p>{type}</p>
								</li>
							{/each}
						</ul>
					</div>
				</caption>
				<TableHead
					class="hidden bg-gray-200 text-sm dark:bg-orange-950/10 dark:text-white md:table-header-group"
				>
					<TableHeadCell>Besin</TableHeadCell>
					<TableHeadCell>Değeri</TableHeadCell>
					<TableHeadCell>Günlük Değer</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each Object.entries(nutritionalInfo.totalNutrients) as [key, value], index}
						{#if Math.round(value.quantity) > 0}
							<TableBodyRow
								class="dark:text-blue-10 grid odd:bg-gray-100 even:bg-gray-200 hover:bg-cyan-200/10 dark:odd:bg-orange-900/10 dark:even:bg-orange-950/10 dark:hover:bg-cyan-950/10 md:table-row"
							>
								<TableBodyCell
									class="flex py-2 text-gray-900 before:me-2 before:min-w-[30%] before:border-e before:pe-1 before:content-[attr(data-label)] md:table-cell md:py-4 before:md:hidden"
									data-label="Besin :">{$t(`${value.label}`)}</TableBodyCell
								>
								<TableBodyCell
									class="flex py-2 text-gray-900 before:me-2 before:min-w-[30%] before:border-e before:pe-1 before:content-[attr(data-label)] md:table-cell md:py-4 before:md:hidden"
									data-label="Değeri :">{Math.round(value.quantity)} {value.unit}</TableBodyCell
								>
								<TableBodyCell
									class="flex py-2 text-gray-900 before:me-2 before:min-w-[30%] before:border-e before:pe-1 before:content-[attr(data-label)] md:table-cell md:py-4 before:md:hidden"
									data-label="Günlük Değer :"
								>
									{nutritionalInfo.totalDaily[key]?.quantity
										? Math.round(nutritionalInfo.totalDaily[key].quantity)
										: ''}
									{nutritionalInfo.totalDaily[key]?.quantity
										? nutritionalInfo.totalDaily[key].unit
										: ''}
								</TableBodyCell>
							</TableBodyRow>
						{/if}
					{/each}
				</TableBody>
			</Table>
		</Card>
	{:else}
		<Card class="max-w-full text-sm text-gray-900 dark:text-gray-300">
			<p>Gösterilecek besin değeri tablosu yok</p>
		</Card>
	{/if}
	{#if nutritionalInfo}
		<Card class="grid max-w-full overflow-x-auto text-sm text-gray-900 dark:text-gray-300">
			<pre>{@html JSON.stringify(nutritionalInfo, null, 2)}</pre>
		</Card>
	{/if}
</div>
