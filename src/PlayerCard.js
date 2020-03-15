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
  const bodyLabelParameter = "bodyPoints";
  const mindLabelParameter = "mindPoints";
  const attackLabelParameter = "attackPoints";
  const defenceLabelParameter = "defencePoints";
  const movementLabelParameter = "movementPoints";
  const goldLabelParameter = "gold";

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
                cardId={props.cardId}
              >
                <FavoriteIcon style={{ fill: "red" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Mind"
                labelParameter={mindLabelParameter}
                cardId={props.cardId}
              >
                <SchoolIcon style={{ fill: "purple" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Attack"
                labelParameter={attackLabelParameter}
                cardId={props.cardId}
              >
                <GavelIcon style={{ fill: "black" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Defence"
                labelParameter={defenceLabelParameter}
                cardId={props.cardId}
              >
                <SecurityIcon style={{ fill: "blue" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Movement"
                labelParameter={movementLabelParameter}
                cardId={props.cardId}
              >
                <DirectionsRunIcon style={{ fill: "green" }} />
              </StatusLabel>
              <StatusLabel
                labelText="Gold"
                labelParameter={goldLabelParameter}
                cardId={props.cardId}
              >
                <EuroIcon style={{ fill: "gold" }} />
              </StatusLabel>
            </Grid>
          </Grid>
        </Grid>
        <StatusModifier
          labelText={"Body"}
          defaultValue={1}
          labelParameter={bodyLabelParameter}
          cardId={props.cardId}
        />
        <StatusModifier
          labelText={"Mind"}
          defaultValue={1}
          labelParameter={mindLabelParameter}
          cardId={props.cardId}
        />
        <StatusModifier
          maxValue={100000}
          step={5}
          labelText={"Gold"}
          defaultValue={25}
          labelParameter={goldLabelParameter}
          cardId={props.cardId}
        />
      </Grid>
    </Card>
  );
};

export default PlayerCard;
