function createToDo(req, data) {
  const protocol = req.protocol,
    host = req.get('host'),
    id = data.id;

  return {
    id: data.id,
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    user_id: data.user_id || null,
    project_id: data.project_id,
    url: `${protocol}://${host}/todo/${id}`,
  };
}

function addErrorReporting(func, message) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log({ err });
      console.log(`${message} caused by: ${err}`);

      // Not always 500, but for simplicity's sake.
      res.status(500).send(`Opps! ${message}.`);
    }
  };
}

module.exports = { createToDo, addErrorReporting };
