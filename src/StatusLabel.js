import React from "react";
import { Box } from "@material-ui/core";

const StatusLabel = ({ children, labelText, labelValue, labelRef }) => {
  return (
    <Box component="span" display="flex" style={{ marginBottom: 2 }}>
      {children}
      <label style={{ fontSize: 20, flex: 1, marginLeft: 5 }}>
        {labelText}
      </label>
      <span ref={labelRef} value={labelValue} style={{ fontSize: 20 }}>
        {labelValue}
      </span>
    </Box>
  );
};

export default StatusLabel;
