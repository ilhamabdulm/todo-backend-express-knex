const { z } = require('zod');

const organizationSchema = z.object({
  name: z.string(),
});

const organizationInviteUser = z.object({
  email: z.string().email(),
  organization_id: z.number().or(z.string()),
});

module.exports = { organizationSchema, organizationInviteUser };
