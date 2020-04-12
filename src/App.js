import React, { useEffect, useState, useCallback } from "react";
import PlayerCard from "./PlayerCard";
import ArmoryPage from "./ArmoryPage";
import TabPanel from "./TabPanel";
import { Grid, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { initialise } from "./actions/statusPoints";
import axios from "axios";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [hasLoaded, setLoaded] = useState(null);
  const [cards, setCards] = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const classes = () => {
    return makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        backgroundColor: "rgba(148, 133, 0, 0.603)",
      },
    }));
  };

  useEffect(() => {
    const initialValues = {};
    const cardsArr = [];

    axios
      .get("http://localhost:5000/player_cards")
      .then((response) => {
        response.data.forEach((card) => {
          const values = {};
          values["bodyPoints"] = card.bodyPoints;
          values["mindPoints"] = card.mindPoints;
          values["attackPoints"] = card.attackPoints;
          values["defencePoints"] = card.defencePoints;
          values["movementPoints"] = card.movementPoints;
          values["gold"] = card.gold;

          initialValues[card._id] = values;

          const base64 = btoa(
            new Uint8Array(card.imageFile.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          cardsArr.push(
            <Grid item xs key={card._id}>
              <PlayerCard
                imagePath={"data:image/png;base64," + base64}
                characterName={card.characterName}
                cardId={card._id}
              />
            </Grid>
          );
        });

        stableDispatch(initialise(initialValues));
        setLoaded(true);
        setCards(cardsArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stableDispatch]);

  if (!hasLoaded) {
    return "Loading...";
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={(event, newIndex) => {
            setTabIndex(newIndex);
          }}
          aria-label="simple tabs example"
        >
          <Tab label="Game" {...a11yProps(0)} />
          <Tab label="Armory" {...a11yProps(1)} />
          <Tab label="Potions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <Grid container spacing={4}>
          {cards}
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ArmoryPage />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Potions
      </TabPanel>
    </div>
  );
}

export default App;
