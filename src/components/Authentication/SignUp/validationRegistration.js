import Validator from "validator";
import isEmpty from "./is-empty";

const validateRegisterInput = data => {
  let errorsObject = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.username)) {
    errorsObject.username = "username required!";
  }

  if (Validator.isEmpty(data.email)) {
    errorsObject.email = "email required!";
  }

  if (Validator.isEmpty(data.password1)) {
    errorsObject.password1 = "password required!";
  }

  if (!Validator.equals(data.password1, data.password2)) {
    errorsObject.password2 = "password does not match!";
  }

  if (Validator.isEmpty(data.password2)) {
    errorsObject.password2 = "Confirm password field is required!";
  }

  return {
    errorsObject,
    isValid: isEmpty(errorsObject)
  };
};

export default validateRegisterInput;
