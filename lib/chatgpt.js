import Constants from 'expo-constants';

export const API_KEY = Constants.expoConfig?.extra.apiKey

export async function askChatGPT(message) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a Trivia Assistant.' },
          { role: 'user', content: String(message) }, // <-- Ensure string
        ],
        temperature: 0.7,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error('OpenAI error:', json);
      return null;
    }

    return json.choices?.[0]?.message?.content ?? null;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}
