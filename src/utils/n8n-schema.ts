import { z } from 'zod';

const credentialSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string(),
  type: z.string(),
  data: z.record(z.any()).optional(),
});

const nodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  typeVersion: z.number(),
  position: z.tuple([z.number(), z.number()]),
  parameters: z.record(z.any()),
  credentials: z.record(credentialSchema).optional(),
  notes: z.string().optional(),
  disabled: z.boolean().optional(),
});

const connectionItemSchema = z.object({
  node: z.string(),
  type: z.string(),
  index: z.number().optional(),
});

const connectionsSchema = z.record(
  z.record(z.array(z.array(connectionItemSchema))),
);

export const workflowSchema = z.object({
  name: z.string().optional(),
  nodes: z.array(nodeSchema),
  connections: connectionsSchema,
  active: z.boolean().optional(),
  settings: z.record(z.any()).optional(),
  staticData: z.record(z.any()).optional(),
});

export type N8nWorkflow = z.infer<typeof workflowSchema>;

