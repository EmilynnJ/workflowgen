import config from '../config';
import { openAiClient } from '../clients/openai-client';
import { anthropicClient } from '../clients/anthropic-client';

export const llmService = {
  async generateWorkflow(prompt: string): Promise<string> {
    if (config.provider === 'openai') {
      const { content } = await openAiClient(prompt);
      return content;
    }

    if (config.provider === 'anthropic') {
      const { content } = await anthropicClient(prompt);
      return content;
    }

    throw new Error(`Unsupported LLM provider: ${config.provider}`);
  },
};

