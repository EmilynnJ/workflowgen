# workflowgen

Generate production-ready n8n workflows from natural language prompts using OpenAI or Anthropic models.

## Features
- REST API with `/generate` endpoint
- CLI command `npm run generate "prompt"`
- Validates and saves workflows to `workflows/`
- Configurable LLM provider via environment variables
- Docker support for deployment

## Setup

### Requirements
- Node.js 18+
- npm 9+

### Installation
```
npm install
npm run build
```

### Environment
Create `.env` with the following variables:
```
PORT=3000
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o-mini
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=4096
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### Running
Development server:
```
npm run dev
```

Production build:
```
npm run build
npm start
```

## API Usage
Endpoint: `POST /generate`
```
{
  "prompt": "create a scraper that pulls emails and saves to Google Sheets"
}
```

### Response
```
{
  "workflow": { ...n8n workflow json... },
  "filePath": "workflows/2024-01-01T12-00-00.000Z.json"
}
```

Import the saved JSON file into n8n via the workflow import dialog.

## CLI Usage
```
npm run generate "create a Slack notifier when Google Sheet updates"
```

## Docker
```
docker build -t workflowgen .
docker run -p 3000:3000 --env-file .env workflowgen
```

## Project Structure
```
src/
  app.ts
  server.ts
  routes/
  services/
  clients/
  utils/
```

## Testing
- Validation occurs automatically on generation.
- Ensure models have access to required API keys via environment variables.

## License
MIT