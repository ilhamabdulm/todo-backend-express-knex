const { z } = require('zod');

const todoSchema = z.object({
  title: z.string(),
  order: z.number(),
  project_id: z.number().or(z.string()),
});

const todoAssignUserSchema = z.object({
  user_id: z.number().or(z.string()),
});

module.exports = { todoSchema, todoAssignUserSchema };
