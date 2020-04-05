import React, { useEffect, useState, useCallback } from "react";
import PlayerCard from "./PlayerCard";
import TabPanel from "./TabPanel";
import { Grid, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { initialise } from "./actions/statusPoints";
import axios from "axios";
import ArmoryItem from "./ArmoryItem";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function App() {
  const [value, setValue] = useState(0);
  const [hasLoaded, setLoaded] = useState(null);
  const [cardIds, setCardIds] = useState(null);
  const [imageFiles, setImageFiles] = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const classes = () => {
    return makeStyles(theme => ({
      root: {
        flexGrow: 1,
        backgroundColor: "rgba(148, 133, 0, 0.603)"
      }
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const initialValues = {};
    const ids = [];
    const img = [];
    axios
      .get("http://localhost:5000/player_cards")
      .then(response => {
        response.data.forEach(card => {
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

          img.push("data:image/png;base64," + base64);
          ids.push(card._id);
        });
        setCardIds(ids);
        setImageFiles(img);
        stableDispatch(initialise(initialValues));
        setLoaded(true);
      })
      .catch(error => {
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
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Game" {...a11yProps(0)} />
          <Tab label="Armory" {...a11yProps(1)} />
          <Tab label="Potions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          <Grid item xs>
            <PlayerCard
              imagePath={imageFiles[0]}
              characterName={"Barbarian"}
              cardId={cardIds[0]}
            />
          </Grid>
          <Grid item xs>
            <PlayerCard
              imagePath={imageFiles[1]}
              characterName={"Dwarf"}
              cardId={cardIds[1]}
            />
          </Grid>
          <Grid item xs>
            <PlayerCard
              imagePath={imageFiles[2]}
              characterName={"Elf"}
              cardId={cardIds[2]}
            />
          </Grid>
          <Grid item xs>
            <PlayerCard
              imagePath={imageFiles[3]}
              characterName={"Wizard"}
              cardId={cardIds[3]}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArmoryItem />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Potions
      </TabPanel>
    </div>
  );
}

export default App;
