import type { N8nWorkflow } from './n8n-schema.js';

export const prettyPrintWorkflow = (workflow: N8nWorkflow): string =>
  JSON.stringify(workflow, null, 2);

