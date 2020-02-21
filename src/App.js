import React from "react";
import PlayerCard from "./PlayerCard";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Grid container spacing={4}>
      <Grid item xs>
        <PlayerCard imagePath={"barbarian.webp"} characterName={"Barbarian"} />
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
  );
}

export default App;
