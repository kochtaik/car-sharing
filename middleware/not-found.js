const notFoundMiddleware = (req, res, next) => {
  return res.status(404).send('Resource does not exist');
}

module.exports = { notFoundMiddleware };