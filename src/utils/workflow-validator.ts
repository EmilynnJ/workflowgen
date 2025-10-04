import { workflowSchema, type N8nWorkflow } from './n8n-schema';

export const validateWorkflowJson = (json: string): N8nWorkflow => {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error('Generated workflow is not valid JSON');
  }

  const result = workflowSchema.safeParse(data);
  if (!result.success) {
    console.error('Validation errors:', JSON.stringify(result.error.format(), null, 2));
    throw new Error(`Generated workflow does not match n8n schema: ${result.error.issues[0]?.message}`);
  }

  return result.data;
};

