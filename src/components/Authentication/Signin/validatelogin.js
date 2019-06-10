import Validator from "validator";
import isEmpty from "./is-empty";

const validateLoginInput = data => {
  let errorsObject = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errorsObject.email = "email required!";
  }

  if (Validator.isEmpty(data.password)) {
    errorsObject.password = "password required!";
  }

  return {
    errorsObject,
    isValid: isEmpty(errorsObject)
  };
};

export default validateLoginInput;
