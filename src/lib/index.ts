import { PRIVATE_LIBRE_TRANS_APIKEY, PRIVATE_EDAMAM_APPID, PRIVATE_EDAMAM_APKEY } from "$env/static/private";

async function translateTextLibre(text: string, targetLanguage: string): Promise<string> {
    const url = "https://translate.kaanvurgun.com/translate";
    const body = JSON.stringify({
        q: text,
        source: "auto",
        target: targetLanguage,
        format: "text",
        api_key: `${PRIVATE_LIBRE_TRANS_APIKEY}`,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

async function translateTextGoogle(text: string, targetLanguage: string): Promise<string> {

    const Googleurl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(text)}`;

    try {
        const response = await fetch(Googleurl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const translations = data[0].map((text: string[]) => text[0]);
        const outputText = translations.join(",");
        return outputText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

async function fetchNutritionalInfo(query: string): Promise<string> {
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${PRIVATE_EDAMAM_APPID}&app_key=${PRIVATE_EDAMAM_APKEY}&force=true`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                ingr: query.split(/\n|\r/)
            }),
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nutritional info:', error);
        throw error;
    }
}

export { translateTextLibre, fetchNutritionalInfo, translateTextGoogle };
