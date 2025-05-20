const organizations = require('../repositories/organization.repository');

const validateOrganizationAccess = async (req, res, next) => {
  let user = req.user;
  let orgId = req.params.id;

  if (!user) {
    return res.status(403).json({
      message: 'Failed authorization',
    });
  }

  const response = await organizations.getByUserIdAndOrganizationId(
    user.decoded.id,
    orgId
  );

  if (!response) {
    return res.status(401).json({
      message: 'You have no access to this organization',
    });
  }

  if (
    (req.method === 'DELETE' && response.delete === false) ||
    ((req.method === 'PUT' || req.method === 'PATCH') &&
      response.update === false) ||
    (req.method === 'GET' && orgId && response.read === false)
  ) {
    return res.status(401).json({
      message: 'You are not allowed in this method',
    });
  }

  next();
};

module.exports = { validateOrganizationAccess };
