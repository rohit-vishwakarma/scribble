import React from "react";

import { AddCircle } from "neetoicons";
import { Button } from "neetoui";

const EmptyState = ({ title, subtitle, primaryAction, primaryActionLabel }) => (
  <div className="flex h-full w-full flex-row items-start justify-start">
    <div className="m-auto w-3/5">
      <h2 className="mb-4 text-center text-2xl font-medium">{title}</h2>
      <p className="mb-8 text-center text-base font-normal leading-relaxed text-gray-600">
        {subtitle}
      </p>
      <div className="flex flex-row items-center justify-center">
        {primaryAction && (
          <Button
            icon={AddCircle}
            label={primaryActionLabel}
            type="primary"
            onClick={primaryAction}
          />
        )}
      </div>
    </div>
  </div>
);

export default EmptyState;
