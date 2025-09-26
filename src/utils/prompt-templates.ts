export const buildGenerationPrompt = (userPrompt: string) => `Generate a valid n8n workflow JSON that fulfills the following request:
"""
${userPrompt}
"""

Requirements:
- Respond with only JSON, no markdown.
- Follow best practices: include nodes for input triggers, actions, and outputs.
- Provide valid connections between nodes.
- Include optional error handling (e.g., error workflow branch) when helpful.
- Use environment variables for secrets using {{$env.SECRET_NAME}}.
- Ensure node parameters are well-structured and n8n-compatible.
`;

