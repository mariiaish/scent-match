export default async function getRecs(shelfString: string, lang: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          shelfString,
          lang,
        }),
      });

      if (!response.ok) {
        const text = await response.text();

        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const result = await response.json();

      const rawContent = result?.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error('Empty model response');
      }

      const cleanJson = rawContent
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleanJson);
    } catch (e) {
      console.error(`Attempt ${attempt + 1} failed:`, e);

      if (attempt === 2) {
        throw e;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}
