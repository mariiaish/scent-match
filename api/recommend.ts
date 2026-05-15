export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const { shelfString, lang } = await req.json();

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

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
            content: `${shelfString}`,
          },
        ],

        temperature: 0.9,
      }),
    });

    const result = await response.json();

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}
