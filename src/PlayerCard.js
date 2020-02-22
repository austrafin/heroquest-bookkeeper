import React from "react";
import NumberInput from "./NumberInput";
import {
  Grid,
  Card,
  makeStyles,
  CardMedia,
  Typography
} from "@material-ui/core";
import PlayerGold from "./PlayerGold";

const useStyles = makeStyles({
  root: {
    padding: "15px"
  },
  media: {
    height: 450
  },
  typography: {
    textAlign: "center",
    fontSize: 50
  }
});

const PlayerCard = ({ imagePath, characterName }) => {
  const classes = useStyles();

  return (
    <Card raised="true" className={classes.root}>
      <Grid container justify="center" direction="column">
        <Typography variant="h1" className={classes.typography}>
          {characterName}
        </Typography>
        <CardMedia
          className={classes.media}
          src={imagePath}
          component="img"
          title={characterName}
        />
        <NumberInput labelText={"Body"} />
        <NumberInput labelText={"Mind"} />
        <PlayerGold />
      </Grid>
    </Card>
  );
};

export default PlayerCard;
