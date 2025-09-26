import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { workflowService } from '../services/workflow-service';

const generateSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long'),
});

export const generateWorkflowHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { prompt } = generateSchema.parse(req.body);
    const result = await workflowService.generateFromPrompt(prompt);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

