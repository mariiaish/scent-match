export const config = { runtime: 'edge' };

export default async function getRecs(shelfString: string) {
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
          role: 'user',
          content: `Ты парфюмерный эксперт. Основываясь на этих парфюмах ${shelfString}, порекомендуй 5 похожих. Верни ТОЛЬКО ответ в формате объекта JSON : { "recommendations": [ { "brand": "...", "name": "...", "reason": "..." } ] }`,
          // "content": `You are a perfume expert. Based on these perfumes: ${shelfString}, recommend 5 similar ones. Return ONLY a JSON object: { "recommendations": [ { "brand": "...", "name": "...", "reason": "..." } ] }`
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

  console.log('Успешный ответ ИИ:', result);

  const aiContent = result.choices[0].message.content;
  const parsed = JSON.parse(aiContent);

  console.log('Наши рекомендации:', parsed.recommendations);
}
