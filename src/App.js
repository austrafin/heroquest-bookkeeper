import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import TabPanel from "./TabPanel";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch } from "react-redux";
import { initialise } from "./actions/statusPoints";
import axios from "axios";

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
  const dispatch = useDispatch();

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
    axios
      .get("http://localhost:5000/player_cards")
      .then(response => {
        response.data.map(card => {
          const values = {};
          values["bodyPoints"] = card.bodyPoints;
          values["mindPoints"] = card.mindPoints;
          values["attackPoints"] = card.attackPoints;
          values["defencePoints"] = card.defencePoints;
          values["movementPoints"] = card.movementPoints;
          values["gold"] = card.gold;

          initialValues[card._id] = values;
          ids.push(card._id);
        });
        setCardIds(ids);
        dispatch(initialise(initialValues));
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!hasLoaded) {
    return "Loading...";
  }

  return (
    <Grid container>
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
                imagePath={"barbarian.webp"}
                characterName={"Barbarian"}
                cardId={cardIds[0]}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"dwarf.jpg"}
                characterName={"Dwarf"}
                cardId={cardIds[1]}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"elf.jpg"}
                characterName={"Elf"}
                cardId={cardIds[2]}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"wizard.webp"}
                characterName={"Wizard"}
                cardId={cardIds[3]}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Armory
        </TabPanel>
        <TabPanel value={value} index={2}>
          Potions
        </TabPanel>
      </div>
    </Grid>
  );
}

export default App;
