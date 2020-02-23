import React from "react";
import NumberInput from "./NumberInput";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import SecurityIcon from "@material-ui/icons/Security";
import EuroIcon from "@material-ui/icons/Euro";

import {
  Grid,
  Card,
  makeStyles,
  CardMedia,
  Typography
} from "@material-ui/core";
import PlayerGold from "./PlayerGold";
import StatusLabel from "./StatusLabel";

const useStyles = makeStyles({
  root: {
    padding: "15px"
  },
  media: {
    height: 160,
    width: "100%"
  },
  typography: {
    fontSize: 30
  }
});

const PlayerCard = ({ imagePath, characterName }) => {
  const classes = useStyles();

  return (
    <Card raised={true} className={classes.root}>
      <Grid container justify="center" direction="column">
        <Grid container direction="row">
          <Grid item xs>
            <CardMedia
              className={classes.media}
              src={imagePath}
              component="img"
              title={characterName}
            />
          </Grid>
          <Grid item xs style={{ marginLeft: 10 }}>
            <Grid container justify="center" direction="column">
              <Typography variant="h4" className={classes.typography}>
                {characterName}
              </Typography>
              <StatusLabel labelText="Body">
                <FavoriteIcon style={{ fill: "red" }} />
              </StatusLabel>
              <StatusLabel labelText="Mind">
                <SchoolIcon style={{ fill: "purple" }} />
              </StatusLabel>
              <StatusLabel labelText="Attack">
                <GavelIcon style={{ fill: "black" }} />
              </StatusLabel>
              <StatusLabel labelText="Defence">
                <SecurityIcon style={{ fill: "blue" }} />
              </StatusLabel>
              <StatusLabel labelText="Gold">
                <EuroIcon style={{ fill: "gold" }} />
              </StatusLabel>
            </Grid>
          </Grid>
        </Grid>

        <NumberInput labelText={"Body"} />
        <NumberInput labelText={"Mind"} />
        <PlayerGold />
      </Grid>
    </Card>
  );
};

export default PlayerCard;
