export const catchAsync = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      throw new Error('Something went wrong 😢: ' + err.message);
    }
  };
};