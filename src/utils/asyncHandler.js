const asyncHandler = (reqHandler) => {
  (req, res, next) => {
    Promise.resolve(reqHandler(req, res, next)).catch((e) => next(e));
  };
};
export default asyncHandler;

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (e) {
//     res.status(e.code || 500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };
