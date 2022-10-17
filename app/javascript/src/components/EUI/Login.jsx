import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button, PageLoader } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import { setAuthHeaders, sitesApi } from "apis/index";
import EUILoginImg from "images/EUILoginImg";

import Header from "./Header";

const Login = ({ setIsAuthorized }) => {
  const [siteData, setSiteData] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { site },
      } = await sitesApi.fetch();
      setSiteData(site);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  const handleSubmit = async values => {
    try {
      const response = await sitesApi.login({ password: values.password });
      localStorage.setItem(
        "authToken",
        JSON.stringify({ token: response.data.authentication_token })
      );
      setIsAuthorized(true);
      setAuthHeaders();
      window.location.href = "/public";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Header />
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
    </>
  );
};
export default Login;
