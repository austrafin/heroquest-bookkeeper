import React from "react";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions/statusPoints";

const StatusLabel = props => {
  const statusPoints = useSelector(state => state.statusPoints);
  const dispatch = useDispatch();

  if (statusPoints[props.labelParameter] === undefined) {
    dispatch(increment(props.startValue, props.labelParameter));
  }

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
