import React, { useState, useEffect } from "react";
import axios from "axios";
import ArmoryItem from "./ArmoryItem";

const ArmoryPage = (props) => {
  const [hasLoaded, setLoaded] = useState(null);
  const [armoryItems, setArmoryItems] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/armory_items")
      .then((response) => {
        setArmoryItems(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!hasLoaded) {
    return "Loading...";
  }

  return (
    <>
      <ArmoryItem data={armoryItems[0]} />
      <ArmoryItem data={armoryItems[1]} />
    </>
  );
};

export default ArmoryPage;
