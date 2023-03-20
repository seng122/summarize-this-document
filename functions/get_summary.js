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

  if (!data.choices || data.choices.length === 0) {
    console.error('Unexpected API response:', JSON.stringify(data, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to get the summary.' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ summary: data.choices[0].text.trim() }),
  };
};