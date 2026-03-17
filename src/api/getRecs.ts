export const config = { runtime: 'edge' };

export default async function getRecs(shelfString: string, lang: string) {
  const systemPrompt = `
    You are a professional perfumer and fragrance critic. 
    Your goal is to recommend 5 perfumes based on the user's collection.

    RULES:
    1. Language: All explanations in the 'reason' field MUST be in ${lang === 'ru' ? 'RUSSIAN' : 'ENGLISH'}.
    2. Format: Return ONLY raw JSON. Do NOT use markdown code blocks (no \`\`\`json).
    3. Data: 'brand' and 'name' must stay in their original Latin/English form for database matching.
    4. JSON structure:
    {
      "recommendations": [
        { "brand": "string", "name": "string", "reason": "string" }
      ]
    }`.trim();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
    },
    body: JSON.stringify({
      model: 'stepfun/step-3.5-flash:free',
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
      reasoning: { enabled: true },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Сервер ответил ошибкой:', text);
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  const result = await response.json();

  console.log('Успешный ответ:', result);

  const aiContent = result.choices[0].message.content;

  const rawContent = result.choices[0].message.content;

  const cleanJson = rawContent
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  try {
    const parsedData = JSON.parse(cleanJson);
    console.log('Успешно:', parsedData);
    // ... отрисовать данные в карточки
  } catch (e) {
    console.error('Ошибка парсинга после очистки:', e);
    console.log('Сырой ответ от ИИ был:', rawContent);
  }

  const parsed = JSON.parse(aiContent);

  console.log('Рекомендации:', parsed.recommendations);
}
