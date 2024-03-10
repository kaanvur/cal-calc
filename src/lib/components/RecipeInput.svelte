<script lang="ts">
 import { Card, Button, Textarea, Select, Label, Tooltip } from 'flowbite-svelte';
 import { InfoCircle } from 'svelte-tabler';

 export let textToTranslate = '';
 export let targetLanguage = 'en';
 export let handleTranslate: () => void;
</script>

<Card class="max-w-full">
 <Label>
    <span class="flex gap-2">
      Tarifini gir
      <Button pill={true} class="p-0" color="none"><InfoCircle/></Button>
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