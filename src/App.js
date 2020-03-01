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
          startAttack={3}
          startDefence={2}
          startMovement={2}
        />
      </Grid>
      <Grid item xs>
        <PlayerCard
          imagePath={"dwarf.jpg"}
          characterName={"Dwarf"}
          startAttack={2}
          startDefence={2}
          startMovement={2}
        />
      </Grid>
      <Grid item xs>
        <PlayerCard
          imagePath={"elf.jpg"}
          characterName={"Elf"}
          startAttack={2}
          startDefence={2}
          startMovement={2}
        />
      </Grid>
      <Grid item xs>
        <PlayerCard
          imagePath={"wizard.webp"}
          characterName={"Wizard"}
          startAttack={1}
          startDefence={2}
          startMovement={2}
        />
      </Grid>
    </Grid>
  );
}

export default App;
