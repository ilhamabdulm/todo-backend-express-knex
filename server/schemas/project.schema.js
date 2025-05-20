const { z } = require('zod');

const projectSchema = z.object({
  name: z.string(),
  organization_id: z.number().or(z.string()),
});

const projectInviteUser = z.object({
  email: z.string().email(),
  project_id: z.number().or(z.string()),
});

module.exports = { projectSchema, projectInviteUser };
