<script lang="ts">
 import { Card, Button, Textarea, Label, Tooltip, Helper } from 'flowbite-svelte';
 import { InfoCircle } from 'svelte-tabler';
export let hasError = '';
 export let textToTranslate = '';
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
      class="mt-2 text-red-700 {hasError ? 'dark:text-red-500 border-red-700 dark:border-red-500' : ''}"
      bind:value={textToTranslate}
      placeholder="Malzemeleri girin"
      rows="10"
       on:input={() => hasError = ''}
    />
 </Label>
 {#if hasError}
 <Helper class='mt-2' color='red'>Tarifin düzgün girilmesi gereklidir</Helper>
 {/if}

 <Button class="my-4" on:click={handleTranslate}>İngilizceye çevir ve Değerleri getir</Button>
</Card>