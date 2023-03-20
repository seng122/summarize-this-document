const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const spNumber = event.queryStringParameters.spNumber;
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = `Please provide a brief summary of the NIST Special Publication ${spNumber}, which is a document related to information security and privacy controls for federal information systems and organizations. The summary should be concise and easy to understand.`;


  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 1,
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