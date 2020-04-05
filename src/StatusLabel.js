import React from "react";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";

const StatusLabel = props => {
  const statusPoints = useSelector(state => state.statusPoints[props.cardId]);

  return (
    <Box component="span" display="flex" style={{ marginBottom: 2 }}>
      {props.children}
      <label style={{ fontSize: 20, flex: 1, marginLeft: 5 }}>
        {props.labelText}
      </label>
      <span style={{ fontSize: 20 }}>{statusPoints[props.labelParameter]}</span>
    </Box>
  );
};

export default StatusLabel;
