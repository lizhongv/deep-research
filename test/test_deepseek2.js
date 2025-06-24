import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

const { text, reasoning } = await generateText({
  model: deepseek('deepseek-reasoner'),
  prompt: 'How many people will live in the world in 2040?',
});

console.log(`\nReasoning: ${reasoning}`);
console.log(`\nText: ${text}`);

// npm install @ai-sdk/deepseek
// node test_deepseek2.js
