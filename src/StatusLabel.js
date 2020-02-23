import React from "react";
import { Box } from "@material-ui/core";

const StatusLabel = ({ children, labelText }) => {
  return (
    <Box component="span" display="flex">
      {children}
      <label style={{ fontSize: 20 }}>{labelText}</label>
    </Box>
  );
};

export default StatusLabel;
