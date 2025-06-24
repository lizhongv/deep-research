// Please install OpenAI SDK first: `npm install openai`

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config({ path: '../.env.local' });

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: '请介绍一下东北大学' }],
    model: 'deepseek-chat',
    temperature: 0.7,
  });

  console.log(completion.choices[0].message.content);
}

main();

// npm install dotenv --save
// node test_deepseek.js
