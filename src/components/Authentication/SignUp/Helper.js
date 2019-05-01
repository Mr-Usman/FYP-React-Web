import React, { Component } from "react";

function validationForm(check, data, field, errors) {
  const { username, email, password1, password2 } = data;

  var err = errors
    ? errors
    : {
        hasError: false,
        errorsObj: {}
      };

  let Validation = {
    username: {
      Validate: [
        {
          condition: username.length < 3,
          message: "Please Specify your full Name."
        }
      ],
      elem: "username"
    },
    email: {
      Validate: [
        {
          condition: !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ),
          message: "Email Invalid"
        }
      ],
      elem: "email"
    },
    password1: {
      Validate: [
        {
          condition: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            password1
          ),
          message:
            "Password Include at least one Small , Capital,Special Character and minimum 8 characters lenght"
        }
      ],
      elem: "password1"
    },
    password2: {
      Validate: [
        {
          condition: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            password2
          ),
          message:
            "Password Include at least one Small , Capital,Special Character and minimum 8 characters lenght"
        }
      ],
      elem: "password2"
    },
    matchedPassword: {
      Validate: [
        {
          condition: password1 !== password2,
          message: "Password Does not match!"
        }
      ]
    }
  };

  if (check === "all") {
    for (var i in Validation) {
      var conArray = Validation[i].Validate;
      err.errorsObj[Validation[i].elem] = { message: [] };
      for (var j = 0; j < conArray.length; j++) {
        if (conArray[j].condition) {
          err.hasError = true;
          err.errorsObj[Validation[i].elem].message.push(conArray[j].message);
        }
      }
      if (!err.errorsObj[Validation[i].elem].message.length) {
        delete err.errorsObj[Validation[i].elem];
      }
    }
    return err;
  }
}

export default validationForm;
