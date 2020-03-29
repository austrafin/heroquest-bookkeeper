import React, { useState } from "react";
import StatusModifier from "./StatusModifier";
import axios from "axios";
import styles from "./PlayerCard.module.css";
import StatusLabel from "./StatusLabel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import SecurityIcon from "@material-ui/icons/Security";
import EuroIcon from "@material-ui/icons/Euro";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton
} from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: 30
      }
    }
  }
});

const PlayerCard = props => {
  const bodyLabelParameter = "bodyPoints";
  const mindLabelParameter = "mindPoints";
  const attackLabelParameter = "attackPoints";
  const defenceLabelParameter = "defencePoints";
  const movementLabelParameter = "movementPoints";
  const goldLabelParameter = "gold";
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <button
        onClick={event => {
          if (selectedFile !== null) {
            const formData = new FormData();
            formData.append("characterImage", selectedFile, selectedFile.name);
            axios
              .post(
                "http://localhost:5000/player_cards/upload_image/" +
                  props.cardId,
                formData
              )
              .catch(error => {
                console.log(error);
              });
          }
        }}
      >
        Upload!
      </button>
      <Card raised={true} className={styles.root}>
        <Grid container justify="center" direction="column">
          <Grid container direction="row">
            <Grid item xs>
              <div className={styles.container}>
                <CardMedia
                  className={styles.media}
                  src={props.imagePath}
                  component="img"
                  title={props.characterName}
                />

                <input
                  id="icon-button-file"
                  className={styles.button}
                  type="file"
                  accept="image/*"
                  onChange={event => {
                    const file = event.target.files[0];
                    if (file === undefined || file === null) {
                      console.log("Error: selected file null");
                    } else if (file.size > 17825792) {
                      console.log("Error: Selected file is too large.");
                    } else if (/^image[/]/.test(file.type) === false) {
                      // Avoid stupid Visual studio formatting bug when using '!'
                      console.log("Error: file type is not image.");
                    } else {
                      console.log(file);
                      setSelectedFile(event.target.files[0]);
                    }
                  }}
                />

                <label htmlFor="icon-button-file">
                  <IconButton
                    className={styles.button}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </Grid>

            <Grid item xs style={{ marginLeft: 10 }}>
              <Grid container justify="center" direction="column">
                <MuiThemeProvider theme={theme}>
                  <Typography variant="h4">{props.characterName}</Typography>
                </MuiThemeProvider>
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
    </>
  );
};

export default PlayerCard;
