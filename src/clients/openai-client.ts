import axios from 'axios';
import { jsonrepair } from 'jsonrepair';
import config from '../config';

const OPENAI_API_BASE_URL = 'https://api.openai.com/v1';

export interface LLMResponse {
  content: string;
}

export const openAiClient = async (prompt: string): Promise<LLMResponse> => {
  if (!config.openAiApiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.openAiApiKey}`,
    'Content-Type': 'application/json',
  };

  if (config.openAiOrgId) {
    headers['OpenAI-Organization'] = config.openAiOrgId;
  }

  const response = await axios.post(
    `${OPENAI_API_BASE_URL}/chat/completions`,
    {
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant that generates valid JSON workflows for n8n. Produce only JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
    {
      headers,
    },
  );

  const message = response.data.choices?.[0]?.message?.content;
  if (!message) {
    throw new Error('No response from OpenAI');
  }

  return {
    content: jsonrepair(message),
  };
};

