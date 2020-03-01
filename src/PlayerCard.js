import React from "react";
import StatusModifier from "./StatusModifier";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import SecurityIcon from "@material-ui/icons/Security";
import EuroIcon from "@material-ui/icons/Euro";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

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
  const bodyLabelParameter = "body" + props.characterName;
  const mindLabelParameter = "mind" + props.characterName;
  const attackLabelParameter = "attack" + props.characterName;
  const defenceLabelParameter = "defence" + props.characterName;
  const movementLabelParameter = "movement" + props.characterName;
  const goldLabelParameter = "gold" + props.characterName;

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
              <StatusLabel
                labelText="Body"
                labelParameter={bodyLabelParameter}
                startValue={props.startBody}
              >
                <FavoriteIcon style={{ fill: "red" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Mind"
                labelParameter={mindLabelParameter}
                startValue={props.startMind}
              >
                <SchoolIcon style={{ fill: "purple" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Attack"
                labelParameter={attackLabelParameter}
                startValue={props.startAttack}
              >
                <GavelIcon style={{ fill: "black" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Defence"
                labelParameter={defenceLabelParameter}
                startValue={props.startDefence}
              >
                <SecurityIcon style={{ fill: "blue" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Movement"
                labelParameter={movementLabelParameter}
                startValue={props.startMovement}
              >
                <DirectionsRunIcon style={{ fill: "green" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Gold"
                labelParameter={goldLabelParameter}
                startValue={0}
              >
                <EuroIcon style={{ fill: "gold" }} />
              </StatusLabel>
            </Grid>
          </Grid>
        </Grid>
        <StatusModifier
          labelText={"Body"}
          startValue={0}
          defaultValue={1}
          labelParameter={bodyLabelParameter}
        />
        <StatusModifier
          labelText={"Mind"}
          startValue={0}
          defaultValue={1}
          labelParameter={mindLabelParameter}
        />
        <StatusModifier
          maxValue={100000}
          step={5}
          labelText={"Gold"}
          startValue={0}
          defaultValue={25}
          labelParameter={goldLabelParameter}
        />
      </Grid>
    </Card>
  );
};

export default PlayerCard;
