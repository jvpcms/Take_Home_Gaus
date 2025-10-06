# Market Analysis Assistant

## Description

This project aims to provide insightful financial analysis on public companies. It correlates benchmark data, market sentiment, and recent news in order to generate reports.

**Stack:** Express, React, PostgreSQL, Finnhub API, n8n

## How to Run

Requirements:
- Docker and Docker Compose

Instructions:
1. Create a .env file in the project root (check the `.env.example` template).
2. From the root directory, run:
```bash
    docker compose up
```

## How It Works: AI Agent Architecture

The logic of the application is orchestrated by an n8n workflow. The financial analysis is broken down into a chain of specialized AI agents with access to search tools.

<img width="756" height="530" alt="Screenshot from 2025-10-06 16-35-52" src="https://github.com/user-attachments/assets/f8f03811-6824-4b3b-acde-38bcc87ecfc8" />

**Agent 1:** The Reporter

This is the first agent in the chain. Its role is collect and compare data.

- **Tools:** It has access to tools for retrieving a company's current stock quote, latest earnings reports, and other financials from the Finnhub API.
- **Goal:** The agent's goal is to establish initial performance report. It compares the company's data against the most relevant benchmark (using the NASDAQ for tech companies and the S&P 500 as a general default).   
- **Output:** It produces a compilation of its findings. In this step we avoid any deep analysis or reasoning, passing the report to the next agent.

**Agent 2:** The Analyst

This agent receives the factual report from the first agent and is responsible for explaining the "why" behind the numbers.

- **Tools:** It has access to tools for fetching recent company news and data on insider trading activity.
- **Goal:** It uses the news and insider trading information to build a rationale that explains the company's performance.
- **Output:** It synthesizes all the information into a final, comprehensive analysis for the user, complete with a conclusion and outlook.

## Challenges & Workarounds

### Limited API Data:
The project uses the free tier of the Finnhub API, which has limitations. For example, historical time-series data for individual companies was not available. This makes performance comparison against a benchmark more difficult.

**Workaround:** The agents were designed to focus on comparing the most recent available data points, such as quarterly earnings and instant quotes.

### Lack of Benchmark Information in API:
The Finnhub API does not provide historical data for market indices like the S&P 500.

**Workaround:** Benchmark data is downloaded and stored locally in the backend. It is then passed into the n8n workflow with each run.

### Latency:
LLM processing times makes the latency increase really fast as the amount of data and number of steps increases.

**Workaround:** The agent structure was simplified to two core agents, and smaller, faster LLM models were used.

## Future Ideas & Improvements

This project serves as a strong foundation, and there are many exciting avenues for future development:

- Look into parsing and analyzing quarterly letters from managers of large investment funds. These provide more profound insights than standard news articles.
- Allow agents to make new tool calls during its reasoning process. For example, if it finds a news article about a product launch, it could trigger a new search for competitor reactions. This would work well with newer reasoning models.   
- Implement WebSockets for real time Updates. Solve the latency issue by having n8n push parts of the analysis to the client via WebSockets as they are completed. This would allow for a more complex agent structure without forcing the user to wait for a single, long HTTP response.
- Add more benchmarks, such as the Dow Jones Industrial Average, and incorporate the VIX (volatility index) to provide a deeper analysis of market sentiment and risk.  
- Instead of asking an LLM to compare raw numbers, perform more complex statistical analyses in the backend. This would feed more specific, pre-processed data to the LLMs, allowing them to focus reasoning.  
- Use a dedicated search engine API instead of the basic news endpoint for retrieving company news. This would provide more relevant results.
