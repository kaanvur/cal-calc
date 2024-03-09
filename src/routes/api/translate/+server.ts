import { translateText, fetchNutritionalInfo, } from '$lib/index';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const { textToTranslate, targetLanguage, hasnutritionalinfo } = await request.json();
    let translatedText = '';
    try {
        translatedText = await translateText(textToTranslate, targetLanguage);
        if (hasnutritionalinfo) {
            const nutritionalInfo = await fetchNutritionalInfo(translatedText);
            return json({ translatedText, nutritionalInfo }, { status: 200 });
        }
        return json({ translatedText }, { status: 200 });
    } catch (error) {
        return json({ error: (error as Error).message, translatedText }, { status: 500 });
    }
}