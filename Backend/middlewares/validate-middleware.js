const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const messages = err.errors.map(e => e.message).join(', ');
    console.log(messages);
    res.status(400).json({ msg: messages });
  }
};

module.exports = validate;
