const { z } = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const userSchemaRegister = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

module.exports = { userSchema, userSchemaRegister };
