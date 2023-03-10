const errors = (error, request, response, next) => {
  console.log(error)
  return response.status(500).json({
    message:error,
    error: error.message,
  });
};
export default errors;
