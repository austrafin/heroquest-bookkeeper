import React from "react";
import StatusModifier from "./StatusModifier";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import SecurityIcon from "@material-ui/icons/Security";
import EuroIcon from "@material-ui/icons/Euro";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { useSelector } from "react-redux";

import {
  Grid,
  Card,
  makeStyles,
  CardMedia,
  Typography
} from "@material-ui/core";
import StatusLabel from "./StatusLabel";

const useStyles = makeStyles({
  root: {
    padding: "15px"
  },
  media: {
    height: 195,
    width: "100%"
  },
  typography: {
    fontSize: 30
  }
});

const PlayerCard = props => {
  const classes = useStyles();
  const statusPoints = useSelector(state => state.statusLabel);

  return (
    <Card raised={true} className={classes.root}>
      <Grid container justify="center" direction="column">
        <Grid container direction="row">
          <Grid item xs>
            <CardMedia
              className={classes.media}
              src={props.imagePath}
              component="img"
              title={props.characterName}
            />
          </Grid>
          <Grid item xs style={{ marginLeft: 10 }}>
            <Grid container justify="center" direction="column">
              <Typography variant="h4" className={classes.typography}>
                {props.characterName}
              </Typography>
              <StatusLabel labelText="Body" labelValue={statusPoints.body}>
                <FavoriteIcon style={{ fill: "red" }} />
              </StatusLabel>
              <StatusLabel labelText="Mind" labelValue={statusPoints.mind}>
                <SchoolIcon style={{ fill: "purple" }} />
              </StatusLabel>
              <StatusLabel labelText="Attack" labelValue={props.startAttack}>
                <GavelIcon style={{ fill: "black" }} />
              </StatusLabel>
              <StatusLabel labelText="Defence" labelValue={props.startDefence}>
                <SecurityIcon style={{ fill: "blue" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Movement"
                labelValue={props.startMovement}
              >
                <DirectionsRunIcon style={{ fill: "green" }} />
              </StatusLabel>
              <StatusLabel labelText="Gold" labelValue={statusPoints.gold}>
                <EuroIcon style={{ fill: "gold" }} />
              </StatusLabel>
            </Grid>
          </Grid>
        </Grid>
        <StatusModifier
          labelText={"Body"}
          labelValue={0}
          defaultValue={1}
          labelParameter={"body"}
        />
        <StatusModifier
          labelText={"Mind"}
          labelValue={0}
          defaultValue={1}
          labelParameter={"mind"}
        />
        <StatusModifier
          maxValue={100000}
          step={5}
          labelText={"Gold"}
          labelValue={0}
          defaultValue={25}
          labelParameter={"gold"}
        />
      </Grid>
    </Card>
  );
};

export default PlayerCard;
