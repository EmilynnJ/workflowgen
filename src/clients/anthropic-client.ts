import axios from 'axios';
import { jsonrepair } from 'jsonrepair';
import config from '../config';

const ANTHROPIC_API_BASE_URL = 'https://api.anthropic.com/v1/messages';

export interface LLMResponse {
  content: string;
}

export const anthropicClient = async (prompt: string): Promise<LLMResponse> => {
  if (!config.anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  const response = await axios.post(
    ANTHROPIC_API_BASE_URL,
    {
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      system: 'You generate valid JSON workflows for n8n. Output only JSON.',
    },
    {
      headers: {
        'x-api-key': config.anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
    },
  );

  const content = response.data.content?.[0]?.text;
  if (!content) {
    throw new Error('No response from Anthropic');
  }

  return { content: jsonrepair(content) };
};

