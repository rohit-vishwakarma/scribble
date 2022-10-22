import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, Checkbox, PageLoader, Toastr } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import sitesApi from "apis/sites";

import Password from "./Password";

import { GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA } from "../constants";

const General = () => {
  const [siteData, setSiteData] = useState({});
  const [loading, setLoading] = useState(true);
  const [passwordTerm, setPasswordTerm] = useState("");
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);
  const [showSetPassword, setShowSetPassword] = useState(false);

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const handleSubmit = async values => {
    if (showSetPassword && !isPasswordValidated) {
      Toastr.error("Please follow the password instructions.");

      return;
    }
    try {
      await sitesApi.update(siteData.id, {
        name: values.sitename,
        password: showSetPassword ? passwordTerm : null,
      });
      localStorage.setItem("authToken", JSON.stringify({ token: null }));
      window.location.reload();
      if (!showSetPassword) setPasswordTerm("");
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { site },
      } = await sitesApi.fetch();
      setSiteData(site);
      if (site.password_digest !== null) {
        setShowSetPassword(true);
        setPasswordTerm(site.password_digest);
      }
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

  return (
    <div className="mx-auto mt-8 w-4/12">
      <Typography className="h-10" style="h2">
        General
      </Typography>
      <Typography className="text-gray-500" style="body1">
        Configure general attributes of scribble.
      </Typography>
      <div className="mt-8">
        <Formik
          validationSchema={GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA}
          initialValues={{
            sitename: siteData.name,
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-2">
            <FormikInput label="Site Name" name="sitename" />
            <Typography className="neeto-ui-text-gray-500" style="body3">
              Customize the site name which is used to show the site name in
            </Typography>
            <Typography className="neeto-ui-text-gray-500" style="h6">
              Open Graph Tags.
            </Typography>
            <hr />
            <Checkbox
              checked={showSetPassword}
              className="pt-1"
              id="show-password"
              label={
                <Typography className="neeto-ui-text-black ml-2" style="h4">
                  Password Protect Knowledge Base
                </Typography>
              }
              onChange={() => setShowSetPassword(prevState => !prevState)}
            />
            {showSetPassword && (
              <Password
                passwordTerm={passwordTerm}
                setIsPasswordValidated={setIsPasswordValidated}
                setPasswordTerm={setPasswordTerm}
              />
            )}
            <div className="flex pt-2">
              <Button label="Save Changes" type="submit" />
              <Button
                label="Cancel"
                style="text"
                type="reset"
                onClick={() => setPasswordTerm("")}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default General;
