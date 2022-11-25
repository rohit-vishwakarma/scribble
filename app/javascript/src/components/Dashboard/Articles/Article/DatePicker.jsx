import React, { useState } from "react";

import { DatePicker as ANTDDatePicker } from "antd";
import { Typography, Modal, Button } from "neetoui";
import { useHistory } from "react-router-dom";

import { articlesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

const DatePicker = ({
  isEdit,
  formValues,
  selectedArticle,
  setShowDatePicker,
  showDatePicker,
}) => {
  const [dateAndTime, setDateAndTime] = useState(null);

  const history = useHistory();

  const handleChange = (_, dateAndTime) => {
    setDateAndTime(dateAndTime);
  };

  const handleSubmit = async () => {
    try {
      formValues.status = "Draft";
      setShowDatePicker(false);
      if (isEdit) {
        await articlesApi.update(selectedArticle.id, formValues);
      } else {
        await articlesApi.create(formValues);
      }
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal
      closeButton={false}
      isOpen={showDatePicker}
      onClose={() => setShowDatePicker(false)}
    >
      <div className="w-full p-2">
        <Typography className="mb-2" style="h4">
          Date and time
        </Typography>
        <ANTDDatePicker
          showTime
          className="w-full"
          format="YYYY-MM-DD HH"
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="Select date and time"
          onChange={handleChange}
        />
        <div className="mt-2 flex space-x-2">
          <Tooltip
            content="Select date and time."
            disabled={!dateAndTime}
            followCursor="horizontal"
            position="bottom"
          >
            <Button
              disabled={!dateAndTime}
              label="Proceed"
              style="primary"
              onClick={handleSubmit}
            />
          </Tooltip>
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowDatePicker(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DatePicker;
