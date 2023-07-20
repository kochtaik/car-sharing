/**
 * A wrapper that allows to avoid repetition
 * of try/catch blocks.
 * @param {} cb - Controller function
 */
const tryCatchWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}


module.exports = tryCatchWrapper;