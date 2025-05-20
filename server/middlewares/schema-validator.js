// Generic validation middleware
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Format Zod error messages for better readability
    // const formatted = error.format();
    console.log({ error });
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: error,
    });
  }
};

module.exports = validate;
