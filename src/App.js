import React from "react";
import PlayerCard from "./PlayerCard";
import TabPanel from "./TabPanel";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import { useDispatch } from "react-redux";
import { increment } from "./actions/statusPoints";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function App() {
  const dispatch = useDispatch();

  axios
    .get("http://localhost:5000/player_cards")
    .then(response => {
      response.data.map(card => {
        dispatch(increment(card.bodyPoints, "body" + card.characterName));
        dispatch(increment(card.mindPoints, "mind" + card.characterName));
        dispatch(increment(card.attackPoints, "attack" + card.characterName));
        dispatch(increment(card.defencePoints, "defence" + card.characterName));
        dispatch(
          increment(card.movementPoints, "movement" + card.characterName)
        );
        dispatch(increment(card.gold, "gold" + card.characterName));
      });
    })
    .catch(error => {
      console.log(error);
    });

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: "rgba(148, 133, 0, 0.603)"
    }
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              />
            </Grid>
            <Grid item xs>
              <PlayerCard imagePath={"dwarf.jpg"} characterName={"Dwarf"} />
            </Grid>
            <Grid item xs>
              <PlayerCard imagePath={"elf.jpg"} characterName={"Elf"} />
            </Grid>
            <Grid item xs>
              <PlayerCard imagePath={"wizard.webp"} characterName={"Wizard"} />
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
