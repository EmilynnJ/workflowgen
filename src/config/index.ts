export type LLMProvider = 'openai' | 'anthropic';

export interface Config {
  provider: LLMProvider;
  openAiApiKey?: string;
  anthropicApiKey?: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const provider = (process.env.LLM_PROVIDER || 'openai') as LLMProvider;

const config: Config = {
  provider,
  openAiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  model:
    process.env.LLM_MODEL || (provider === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet'),
  temperature: process.env.LLM_TEMPERATURE ? Number(process.env.LLM_TEMPERATURE) : 0.2,
  maxTokens: process.env.LLM_MAX_TOKENS ? Number(process.env.LLM_MAX_TOKENS) : 4096,
};

export default config;

