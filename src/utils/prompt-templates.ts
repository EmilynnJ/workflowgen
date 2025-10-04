export const buildGenerationPrompt = (userPrompt: string) => `Generate a valid n8n workflow JSON that fulfills the following request:
"""
${userPrompt}
"""

CRITICAL: Respond with ONLY the JSON object. No markdown, no code blocks, no explanations.

Example n8n workflow structure:
{
  "name": "My Workflow",
  "nodes": [
    {
      "id": "node-1",
      "name": "Start",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [250, 300],
      "parameters": {}
    }
  ],
  "connections": {},
  "active": false,
  "settings": {},
  "staticData": null
}

Requirements:
- Each node must have: id, name, type, typeVersion, position (array of 2 numbers), parameters (object)
- connections is an object where keys are node names, values are objects with "main" arrays
- Use real n8n node types like: n8n-nodes-base.webhook, n8n-nodes-base.httpRequest, n8n-nodes-base.set, etc.
- Use environment variables for secrets: {{$env.API_KEY}}
- position should be [x, y] coordinates like [250, 300]
`;

