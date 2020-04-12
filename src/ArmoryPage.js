import React, { useState, useEffect } from "react";
import axios from "axios";
import ArmoryItem from "./ArmoryItem";

const ArmoryPage = (props) => {
  const [hasLoaded, setLoaded] = useState(null);
  const [armoryItems, setArmoryItems] = useState(null);

  useEffect(() => {
    const armoryArr = [];
    axios
      .get("http://localhost:5000/armory_items")
      .then((response) => {
        response.data.forEach((item) => {
          armoryArr.push(<ArmoryItem data={item} key={item._id} />);
        });
        setArmoryItems(armoryArr);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!hasLoaded) {
    return "Loading...";
  }

  return <>{armoryItems}</>;
};

export default ArmoryPage;
