#!/usr/bin/env node
import dotenv from 'dotenv';
import process from 'node:process';
import { workflowService } from '../services/workflow-service';

dotenv.config();

const prompt = process.argv.slice(2).join(' ');

const run = async () => {
  if (!prompt) {
    console.error('Usage: npm run generate "prompt text"');
    process.exit(1);
  }

  try {
    const result = await workflowService.generateFromPrompt(prompt);
    console.log(JSON.stringify(result.workflow, null, 2));
    console.log(`Workflow saved to ${result.filePath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
    process.exit(1);
  }
};

void run();

