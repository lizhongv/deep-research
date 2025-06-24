## 安装及运行

```bash
# 下载源码，进入工作目录
git clone git@github.com:lizhongv/deep-research.git
cd deep-research

# 修改环境变量
cp .env.example .env.local
vi .env.local

# FIRECRAWL_KEY=xxx
# OPENAI_KEY=xxx
# OPENAI_ENDPOINT="https://api.openai-proxy.org/v1"
# DEEPSEEK_API_KEY="YOUR_KEY"
# DEEPSEEK_ENDPOINT="https://api.deepseek.com/v1"

# 安装依赖
npm install

# 运行程序
npm start
```

## 运行的细节

首先问研究主题，并让填写研究的广度和深度，以及最后希望生成报告还是答案。

```bash
What would you like to research? A2A
Enter research breadth (recommended 2-10, default 4): 3
Enter research depth (recommended 1-5, default 2): 2
Do you want to generate a long report or a specific answer? (report/answer, default report): report
Creating research plan...
```

程向用户提三个问题，进一步澄清要研究的主题。

```bash
To better understand your research needs, please answer these follow-up questions:

Can you clarify what A2A stands for in your query (e.g., account-to-account transfers, application-to-application communications, or another meaning)?
Your answer: google a2a protocol

What specific industry or application domain are you targeting with A2A (such as fintech, SaaS integration, IoT, etc.)?
Your answer: technology

Are you interested in the technological framework/architecture, regulatory aspects, or business models associated with A2A solutions?
Your answer: technical functionality

Starting research...
```

深度研究中间生成三个子问题。

```bash
Created 3 queries [
  {
    query: 'Google A2A protocol technical architecture deep dive',
    researchGoal: 'Investigate the core technical components and architectural principles of the Google A2A protocol. The objective is to uncover detailed documentation, whitepapers, and case studies that describe how the protocol is engineered, focusing on its data exchange methods, scalability, and optimization techniques. Once the architectural components and design rationales are identified, further research could compare the protocol’s structure to similar communication frameworks in the technology industry and assess its adaptability to emerging systems.'
  },
  {
    query: 'Google A2A protocol integration and interoperability standards',
    researchGoal: 'Examine how the Google A2A protocol interfaces with other systems and platforms within the technology ecosystem. The goal is to identify interoperability standards, API integration strategies, and compliance with industry protocols. Additional research directions include studying the adaptation of the protocol in multi-vendor environments and exploring its impact on system cohesion and data exchange efficiency across diverse technological frameworks.'
  },
  {
    query: 'Google A2A protocol performance evaluation and security architecture',
    researchGoal: 'Analyze the performance metrics and security measures implemented within the Google A2A protocol. The research should target benchmarks, latency, throughput data, as well as encryption strategies, authentication processes, and risk mitigation techniques employed. Beyond initial performance analysis, further inquiry may include critical reviews of potential vulnerabilities, stress testing results, and comparisons with alternative protocols to determine overall reliability in technologically intensive environments.'
  }
]
```

https://github.com/user-attachments/assets/9e07da90-e85d-4e78-8780-8cc408241809
