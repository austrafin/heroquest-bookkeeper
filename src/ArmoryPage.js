import React from "react";
import { useSelector } from "react-redux";
import ArmoryItem from "./ArmoryItem";

export default (props) => {
  const armoryItemsData = useSelector((state) => state.armoryItems);
  const armoryItems = [];

  Object.entries(armoryItemsData.items).map(([key, item]) =>
    armoryItems.push(<ArmoryItem data={item} key={key} />)
  );

  return <>{armoryItems}</>;
};
