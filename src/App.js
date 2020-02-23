import React from "react";
import PlayerCard from "./PlayerCard";
import { Grid } from "@material-ui/core";

function App() {
  return (
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
          startGold={0}
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
          startGold={0}
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
          startGold={0}
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
          startGold={0}
        />
      </Grid>
    </Grid>
  );
}

export default App;
