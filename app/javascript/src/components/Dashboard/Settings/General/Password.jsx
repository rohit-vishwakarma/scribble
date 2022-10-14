import React, { useEffect, useState } from "react";

import { Check, Close } from "neetoicons";
import { Typography } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

const Password = ({
  passwordTerm,
  setPasswordTerm,
  setIsPasswordValidated,
}) => {
  const [isAtLeastCharacters, setIsAtLeastCharacters] = useState(false);
  const [isAtLeastLetterNumber, setIsAtLeastLetterNumber] = useState(false);
  const pattern = "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))";

  useEffect(() => {
    checkValidation(passwordTerm);
  }, []);

  const handleChange = value => {
    checkValidation(value);
    setPasswordTerm(value);
  };

  const checkValidation = value => {
    if (value.length > 5 && value.match(pattern)) {
      setIsPasswordValidated(true);
    } else {
      setIsPasswordValidated(false);
    }

    value.length > 5
      ? setIsAtLeastCharacters(true)
      : setIsAtLeastCharacters(false);

    value.match(pattern)
      ? setIsAtLeastLetterNumber(true)
      : setIsAtLeastLetterNumber(false);
  };

  return (
    <>
      <FormikInput
        className="mt-6 mb-px"
        label="Password"
        name="password"
        type="password"
        value={passwordTerm}
        onChange={e => handleChange(e.target.value)}
      />
      <Typography className="flex" style="body3">
        {isAtLeastCharacters ? (
          <Check className="my-auto text-green-600 " size={15} />
        ) : (
          <Close className="my-auto text-red-600" size={15} />
        )}
        &nbsp; Have at least 6 characters
      </Typography>
      <Typography className="flex" style="body3">
        {isAtLeastLetterNumber ? (
          <Check className="my-auto text-green-600" size={15} />
        ) : (
          <Close className="my-auto text-red-600" size={15} />
        )}
        &nbsp; Include at least 1 letter and 1 number
      </Typography>
    </>
  );
};

export default Password;
