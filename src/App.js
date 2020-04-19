import React, { useState } from "react";
import ArmoryPage from "./ArmoryPage";
import TabPanel from "./TabPanel";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GamePage from "./GamePage";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(148, 133, 0, 0.603)",
  },
}));

const App = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

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
        <GamePage />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ArmoryPage />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Potions
      </TabPanel>
    </div>
  );
};

export default App;
