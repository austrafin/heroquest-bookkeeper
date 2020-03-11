import React from "react";
import PlayerCard from "./PlayerCard";
import TabPanel from "./TabPanel";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function App() {
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
                startBody={7}
                startMind={3}
                startAttack={3}
                startDefence={2}
                startMovement={2}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"dwarf.jpg"}
                characterName={"Dwarf"}
                startBody={7}
                startMind={3}
                startAttack={2}
                startDefence={2}
                startMovement={2}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"elf.jpg"}
                characterName={"Elf"}
                startBody={6}
                startMind={4}
                startAttack={2}
                startDefence={2}
                startMovement={2}
              />
            </Grid>
            <Grid item xs>
              <PlayerCard
                imagePath={"wizard.webp"}
                characterName={"Wizard"}
                startBody={4}
                startMind={6}
                startAttack={1}
                startDefence={2}
                startMovement={2}
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
