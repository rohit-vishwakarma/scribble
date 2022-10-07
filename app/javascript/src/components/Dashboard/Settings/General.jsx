import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography, Button, Checkbox } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

const General = () => {
  const [passwordTerm, setPasswordTerm] = useState("");
  const [isAtLeastCharacters, setIsAtLeastCharacters] = useState(false);
  const [isAtLeastLetterNumber, setIsAtLeastLetterNumber] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);

  const handleSubmit = values => {
    values.password = passwordTerm;
  };

  const handleChange = value => {
    setPasswordTerm(value);
    if (passwordTerm.length > 5) {
      setIsAtLeastCharacters(true);
    } else {
      setIsAtLeastCharacters(false);
    }

    if (
      passwordTerm.match("[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))")
    ) {
      setIsAtLeastLetterNumber(true);
    } else {
      setIsAtLeastLetterNumber(false);
    }
  };

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
          initialValues={{
            name: "Spinkart",
            password: passwordTerm,
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-2">
            <FormikInput label="Name" name="name" />
            <Typography style="body3">
              Customize the site name which is used to show the site name in
              Open Graph Tags.
            </Typography>
            <hr />
            <div className="mt-5">
              <Checkbox
                checked={showSetPassword}
                id="checkbox_name"
                label="Password Protect Knowledge Base"
                onChange={() => setShowSetPassword(prevState => !prevState)}
              />
              {showSetPassword && (
                <>
                  <FormikInput
                    label="Password"
                    name="password"
                    type="password"
                    value={passwordTerm}
                    onChange={e => handleChange(e.target.value)}
                  />
                  <Typography className="flex" style="body3">
                    {isAtLeastCharacters ? (
                      <Check className="my-auto" size={12} />
                    ) : (
                      <Close className="my-auto" size={12} />
                    )}
                    &nbsp; Have at least 6 characters
                  </Typography>
                  <Typography className="flex" style="body3">
                    {isAtLeastLetterNumber ? (
                      <Check className="my-auto" size={12} />
                    ) : (
                      <Close className="my-auto" size={12} />
                    )}
                    &nbsp; Include at least 1 letter and 1 number
                  </Typography>
                </>
              )}
            </div>
            <Button label="Save Changes" type="submit" />
            <Button label="Cancel" style="text" type="reset" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default General;
