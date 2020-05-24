import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArmoryItem from "./ArmoryItem";
import { initialiseArmoryItems } from "./actions/armoryItems";

export default (props) => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const armoryItemsData = useSelector((state) => state.armoryItems);

  useEffect(() => {
    stableDispatch(initialiseArmoryItems());
  }, [stableDispatch]);

  if (!armoryItemsData.armoryItemsLoaded) {
    return "Loading...";
  }

  const armoryItems = [];

  armoryItemsData.items.map((item) =>
    armoryItems.push(<ArmoryItem data={item} key={item._id} />)
  );

  return <>{armoryItems}</>;
};
