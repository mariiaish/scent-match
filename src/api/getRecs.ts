export const config = { runtime: 'edge' };

export default async function getRecs(shelfString: string, lang: string) {
  const systemPrompt = `
    You are a professional perfumer and fragrance critic.

    Recommend 5 perfumes based on the user's fragrance collection.

    Recommendations should match:
    - scent profile
    - overall vibe
    - mood
    - aesthetic
    - seasonality
    - sweetness/freshness level

    RULES:
    1. All text in "reason" must be in ${lang === 'ru' ? 'RUSSIAN' : 'ENGLISH'}.

    2. Return ONLY valid parsable JSON.
    Do not include markdown or any text outside JSON.

    3. Keep perfume and brand names in their original Latin form.

    4. Notes in "top", "middle", and "base":
    - must be arrays
    - must contain lowercase English note names only

    JSON format:
    {
      "recommendations": [
        {
          "id": "string",
          "brand": "string",
          "perfume": "string",
          "reason": "string",
          "top": ["string"],
          "middle": ["string"],
          "base": ["string"]
        }
      ]
    }
  `.trim();
  // const systemPrompt = `
  //   You are a professional perfumer and fragrance critic.
  //   Your goal is to recommend 5 perfumes based on the user's collection.

  //   RULES:
  //   1. Language: All explanations in the 'reason' field MUST be in ${lang === 'ru' ? 'RUSSIAN' : 'ENGLISH'}.
  //   2. Format: Return ONLY raw JSON. Do NOT use markdown code blocks (no \`\`\`json).
  //   3. Data: 'brand' and 'perfume' must stay in their original Latin/English form for database matching. Field 'perfume' means it's name.
  //   'top' - top notes, 'middle' - middle notes, 'base' - base notes, all this fields must stay in English and in lowercase.
  //   4. JSON structure:
  //   {
  //     "recommendations": [
  //       { "id": "string", "brand": "string", "perfume": "string", "reason": "string", "top": "string[]", "middle": "string[]", "base": "string[]" }
  //     ]
  //   }`.trim();

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'Scent Match',
        },
        body: JSON.stringify({
          model: 'openrouter/free',

          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: `My collection: ${shelfString}. Recommend 5 similar perfumes.`,
            },
          ],

          temperature: 0.9,
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

      const parsedData = JSON.parse(cleanJson);

      return parsedData;
    } catch (e) {
      console.error(`Attempt ${attempt + 1} failed:`, e);

      if (attempt === 2) {
        throw e;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}
