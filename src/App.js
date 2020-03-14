import React, { useEffect } from "react";
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
  const dispatch = useDispatch();
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

  useEffect(() => {
    const initialValues = {};
    axios
      .get("http://localhost:5000/player_cards")
      .then(response => {
        response.data.map(card => {
          initialValues["body" + card.characterName] = card.bodyPoints;
          initialValues["mind" + card.characterName] = card.mindPoints;
          initialValues["attack" + card.characterName] = card.attackPoints;
          initialValues["defence" + card.characterName] = card.defencePoints;
          initialValues["movement" + card.characterName] = card.movementPoints;
          initialValues["gold" + card.characterName] = card.gold;
        });
        dispatch(initialise(initialValues));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
