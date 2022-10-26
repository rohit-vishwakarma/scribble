import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import organizationsApi from "apis/organizations";

import { GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ organizationData }) => {
  const [showPassword, setShowPassword] = useState(
    organizationData.isPasswordProtected
  );

  const handleSubmit = async values => {
    try {
      await organizationsApi.update({
        name: values.name,
        password: values.password,
        is_password_protected: values.isChecked,
      });
      localStorage.setItem("authToken", JSON.stringify({ token: null }));
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      validationSchema={GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA(showPassword)}
      initialValues={{
        name: organizationData.name,
        isChecked: organizationData.isPasswordProtected,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
        <FormikForm className="space-y-2">
          <div className="border-b-2 pb-4">
            <Input
              required
              className="mt-6 mb-px"
              id="name"
              label="Site Name"
              name="name"
              type="text"
            />
            <Typography className="neeto-ui-text-gray-500" style="body3">
              Customize the site name which is used to show the site name in
            </Typography>
            <Typography className="neeto-ui-text-gray-500" style="h6">
              Open Graph Tags.
            </Typography>
          </div>
          <Checkbox
            checked={showPassword}
            className="mt-3"
            id="isChecked"
            name="isChecked"
            label={
              <Typography className="neeto-ui-text-black ml-2" style="h4">
                Password Protect Knowledge Base
              </Typography>
            }
            onChange={() => {
              setFieldValue("isChecked", !showPassword);
              setShowPassword(prevState => !prevState);
            }}
          />
          {showPassword && (
            <div className="flex">
              <Input
                required
                className="mt-4 mb-px"
                id="password"
                label="Password"
                name="password"
                placeholder="******"
                type="password"
              />
            </div>
          )}
          <div className="flex gap-x-1 pt-2">
            <Button
              disabled={isSubmitting || !dirty}
              label="Save changes"
              type="submit"
            />
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={() =>
                setShowPassword(organizationData.isPasswordProtected)
              }
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
