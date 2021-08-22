import React from "react";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";

export default (props) => {
  const statusPoints = useSelector(
    (state) => state.playerCards.cardData[props.cardId]
  );

  return (
    <Box component="span" display="flex" style={{ marginBottom: 2 }}>
      {props.children}
      <label style={{ fontSize: 20, marginLeft: 5 }}>{props.labelText}</label>
      <span style={{ fontSize: 20, marginRight: 10 }}>
        {statusPoints[props.labelParameter]}
      </span>
    </Box>
  );
};
