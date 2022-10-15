import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import EUILoginImg from "images/EUILoginImg";

const Login = ({ siteData, setShowLoginPage }) => {
  const handleSubmit = value => {
    if (value.password === siteData.password) {
      setShowLoginPage(false);
    } else {
      Toastr.warning("Incorrect password!");
    }
  };

  return (
    <div className="mt-16 grid justify-center p-8">
      <img className="mx-auto justify-center" src={EUILoginImg} />
      <Typography className="mt-6" style="h2">
        {siteData.name} is password protected!
      </Typography>
      <Typography className="text-gray-600" style="body1">
        Enter the password to gain access to {siteData.name}.
      </Typography>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={yup.object().shape({
          password: yup.string().required("Password is required."),
        })}
        onSubmit={handleSubmit}
      >
        <FormikForm className="mt-8">
          <Input required label="Password" name="password" type="password" />
          <Button className="mt-6" label="continue" type="submit" />
        </FormikForm>
      </Formik>
    </div>
  );
};
export default Login;
