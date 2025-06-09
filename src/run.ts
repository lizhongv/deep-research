// 1. 依赖引入
import * as fs from 'fs/promises';  // 文件系统（异步操作）
import * as readline from 'readline';  // 命令行交互

import { getModel } from './ai/providers';  // AI模型获取
import {
  deepResearch,
  writeFinalAnswer,
  writeFinalReport,
} from './deep-research';  // 研究核心逻辑
import { generateFeedback } from './feedback';  // 生成追问

// 2. 辅助函数
function log(...args: any[]) {
  console.log(...args);
} 

const rl = readline.createInterface({  // 创建readline接口，在命令行实现交互式输入与输出
  input: process.stdin,
  output: process.stdout,
});


function askQuestion(query: string): Promise<string> {  // 封装命令行提问
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

// run the agent   3. 主流程函数
async function run() {
  console.log('Using model: ', getModel().modelId);

  // Get initial query    3.1 获取基础参数
  const initialQuery = await askQuestion('What would you like to research? ');

  // Get breath and depth parameters
  const breadth =
    parseInt(
      await askQuestion(
        'Enter research breadth (recommended 2-10, default 4): ',
      ),
      10,
    ) || 4;
  const depth =
    parseInt(
      await askQuestion('Enter research depth (recommended 1-5, default 2): '),
      10,
    ) || 2;
  const isReport =
    (await askQuestion(
      'Do you want to generate a long report or a specific answer? (report/answer, default report): ',
    )) !== 'answer';

  // 3.2  生成不能够收集追问
  let combinedQuery = initialQuery;
  if (isReport) {
    log(`Creating research plan...`);

    // Generate follow-up questions     
    const followUpQuestions = await generateFeedback({
      query: initialQuery,
    });

    log(
      '\nTo better understand your research needs, please answer these follow-up questions:',
    );

    // Collect answers to follow-up questions
    const answers: string[] = [];
    for (const question of followUpQuestions) {
      const answer = await askQuestion(`\n${question}\nYour answer: `);
      answers.push(answer);
    }

    // Combine all information for deep research
    combinedQuery = `
Initial Query: ${initialQuery}
Follow-up Questions and Answers:
${followUpQuestions.map((q: string, i: number) => `Q: ${q}\nA: ${answers[i]}`).join('\n')}
`;
  }

  log('\nStarting research...\n');

  const { learnings, visitedUrls } = await deepResearch({
    query: combinedQuery,
    breadth,
    depth,
  });

  log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
  log(`\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`);
  log('Writing final report...');

  if (isReport) {
    const report = await writeFinalReport({
      prompt: combinedQuery,
      learnings,
      visitedUrls,
    });

    await fs.writeFile('report.md', report, 'utf-8');
    console.log(`\n\nFinal Report:\n\n${report}`);
    console.log('\nReport has been saved to report.md');
  } else {
    const answer = await writeFinalAnswer({
      prompt: combinedQuery,
      learnings,
    });

    await fs.writeFile('answer.md', answer, 'utf-8');
    console.log(`\n\nFinal Answer:\n\n${answer}`);
    console.log('\nAnswer has been saved to answer.md');
  }

  rl.close();
}

run().catch(console.error);
