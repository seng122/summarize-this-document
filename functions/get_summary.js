const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const spNumber = event.queryStringParameters.spNumber;
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = `Summarize NIST Special Publication ${spNumber}:`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ summary: data.choices[0].text.trim() }),
  };
};