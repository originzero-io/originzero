import ErrorClass from "../../utils/ErrorClass.js";
const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  console.log("Error Name: ", err.name);
  console.log("Erorr Message: ", err.message);
  console.log("Erorr Status: ", err.status);
  if (err.name === "SyntaxError") {
    customError = new ErrorClass("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new ErrorClass(err.message, 400);
  }
  if (err.code === 11000) {
    customError = new ErrorClass("Duplicate Key Found: Check your input", 400);
  }
  if (err.name === "CastError") {
    customError = new ErrorClass("Please provide a valid id", 400);
  }
  if (err.name === "MulterError") {
    customError = new ErrorClass(err.message, 400);
  }
  if (err.name === "TypeError") {
    customError = new ErrorClass(err.message, 400);
  }
  //console.log(customError.message, customError.status || customError.response.status)

  res
    .status(customError.status || customError.response.status || 500) //customError.status yoksa 500 ver
    .json({
      success: false,
      message: customError.response?.data.message || customError.message || "Internal server error",
    });
};

export default customErrorHandler;
