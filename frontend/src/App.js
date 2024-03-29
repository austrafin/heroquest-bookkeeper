import React, { useState } from "react";
import ArmoryPage from "./Pages/ArmoryPage";
import TabPanel from "./Components/Common/TabPanel";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GamePage from "./Pages/GamePage";

const useStyles = makeStyles(() => ({
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
        >
          <Tab label="Game" />
          <Tab label="Armory" />
          <Tab label="Potions" />
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
