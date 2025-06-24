// Please install OpenAI SDK first: `npm install openai`

// import dotenv from 'dotenv'; // 导入 dotenv
// import OpenAI from 'openai';

// // 加载 .env.local 文件中的环境变量
// dotenv.config({ path: '.env.local' });

// const openai = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: process.env.DEEPSEEK_API_KEY, // 从环境变量获取密钥
// });

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'system', content: '请介绍一下东北大学' }],
//     model: 'deepseek-chat',
//     temperature: 0.7,
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();

// npm install dotenv --save
// node test_deepseek.js

import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

// const { text } = await generateText({
//   model: deepseek('deepseek-chat'),
//   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
// });

// console.log(text);

const { text, reasoning } = await generateText({
  model: deepseek('deepseek-reasoner'),
  prompt: 'How many people will live in the world in 2040?',
});

console.log(`\nReasoning: ${reasoning}`);
console.log(`\nText: ${text}`);
// npm install @ai-sdk/deepseek
