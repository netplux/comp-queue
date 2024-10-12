const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateAIContent(prompt) {
  const response = await openai.createCompletion({
    model: 'gpt-4',
    prompt,
    max_tokens: 500,
  });
  return response.data.choices[0].text;
}

module.exports = { generateAIContent };
