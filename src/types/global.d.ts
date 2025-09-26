export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
      LLM_PROVIDER?: 'openai' | 'anthropic';
      LLM_MODEL?: string;
      LLM_TEMPERATURE?: string;
      LLM_MAX_TOKENS?: string;
      OPENAI_API_KEY?: string;
      ANTHROPIC_API_KEY?: string;
    }
  }
}

