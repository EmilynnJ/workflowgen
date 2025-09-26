import fs from 'node:fs/promises';
import path from 'node:path';
import { llmService } from './llm-service';
import { validateWorkflowJson } from '../utils/workflow-validator';
import { buildGenerationPrompt } from '../utils/prompt-templates';

const WORKFLOWS_DIR = path.resolve(process.cwd(), 'workflows');

const ensureWorkflowsDir = async () => {
  await fs.mkdir(WORKFLOWS_DIR, { recursive: true });
};


export const workflowService = {
  async generateFromPrompt(prompt: string) {
    await ensureWorkflowsDir();

    const llmPrompt = buildGenerationPrompt(prompt);
    const workflowJson = await llmService.generateWorkflow(llmPrompt);
    const validated = validateWorkflowJson(workflowJson);

    const timestamp = new Date().toISOString().replace(/[:]/g, '-');
    const filePath = path.join(WORKFLOWS_DIR, `${timestamp}.json`);
    await fs.writeFile(filePath, JSON.stringify(validated, null, 2), 'utf-8');

    const relativePath = path.relative(process.cwd(), filePath);

    return { workflow: validated, filePath: relativePath };
  },
};

