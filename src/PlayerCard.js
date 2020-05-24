import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusModifier from "./StatusModifier";
import axios from "axios";
import styles from "./PlayerCard.module.css";
import StatusLabel from "./StatusLabel";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Collapsible from "react-collapsible";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import {
  ArrowDropDown,
  ArrowDropUp,
  PhotoCamera,
  CheckCircle,
  Cancel,
} from "@material-ui/icons";
import {
  GiHighShot,
  GiGladius,
  GiHearts,
  GiScrollUnfurled,
  GiArrowhead,
  GiWalkingBoot,
  GiCheckedShield,
  GiCoins,
} from "react-icons/gi";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@material-ui/core";

export default (props) => {
  const theme = createMuiTheme({
    overrides: {
      MuiTypography: {
        h4: {
          fontSize: 30,
        },
      },
    },
  });

  const armoryItems = useSelector(
    (state) => state.playerCardData[props.cardId].armoryItems
  );
  const bodyLabelParameter = "bodyPoints";
  const mindLabelParameter = "mindPoints";
  const meleeLabelParameter = "meleePoints";
  const rangedLabelParameter = "rangedPoints";
  const diagonalLabelParameter = "diagonalPoints";
  const defenceLabelParameter = "defencePoints";
  const movementLabelParameter = "movementPoints";
  const goldLabelParameter = "gold";
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(props.imagePath);
  const browseImageId = "browse-image-" + props.cardId;
  let imageUploadInputs = null;
  let armoryItemListItems = [];

  const handleCancel = () => {
    setSelectedFile(null);
    setImageFile(props.imagePath);
  };

  const uploadImage = () => {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("characterImage", selectedFile, selectedFile.name);
      axios
        .post(
          "http://localhost:5000/player_cards/upload_image/" + props.cardId,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            setSelectedFile(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleImageBrowse = (event) => {
    const file = event.target.files[0];
    if (file === undefined || file === null) {
      console.log("Error: selected file null");
    } else if (file.size > 17825792) {
      console.log("Error: Selected file is too large.");
    } else if (!/^image[/]/.test(file.type)) {
      console.log("Error: file type is not image.");
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  if (selectedFile !== null) {
    const uploadId = "upload-image-" + props.cardId;
    const cancelId = "cancel-image-" + props.cardId;
    imageUploadInputs = (
      <>
        <input
          id={uploadId}
          className={styles.uploadbutton}
          onClick={uploadImage}
        />
        <label htmlFor={uploadId}>
          <IconButton
            className={styles.uploadbutton}
            aria-label="upload picture"
            component="span"
          >
            <CheckCircle style={{ fill: "green" }} />
          </IconButton>
        </label>

        <input
          id={cancelId}
          className={styles.uploadbutton}
          onClick={handleCancel}
        />
        <label htmlFor={cancelId}>
          <IconButton
            className={styles.uploadbutton}
            aria-label="upload picture"
            component="span"
          >
            <Cancel style={{ fill: "red" }} />
          </IconButton>
        </label>
      </>
    );
  }

  if (armoryItems !== undefined) {
    armoryItemListItems = armoryItems.map((item, key) => item.name);
  }

  return (
    <>
      <Card raised={true} className={styles.root}>
        <Grid container justify="center" direction="column">
          <Grid container direction="row">
            <Grid item xs>
              <div className={styles.container}>
                <CardMedia
                  className={styles.media}
                  src={imageFile}
                  component="img"
                  title={props.characterName}
                />

                <input
                  id={browseImageId}
                  className={styles.button}
                  type="file"
                  accept="image/*"
                  onChange={handleImageBrowse}
                />

                <label htmlFor={browseImageId}>
                  <IconButton
                    className={styles.button}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>

                {imageUploadInputs}
              </div>
            </Grid>

            <Grid item xs style={{ marginLeft: 10 }}>
              <Grid container justify="center" direction="column">
                <MuiThemeProvider theme={theme}>
                  <Typography variant="h4">{props.characterName}</Typography>
                </MuiThemeProvider>

                <Grid container justify="center" direction="row">
                  <Grid item xs>
                    <StatusLabel
                      labelParameter={bodyLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiHearts color="red" className={styles.icon} />
                    </StatusLabel>

                    <StatusLabel
                      labelParameter={mindLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiScrollUnfurled
                        color="purple"
                        className={styles.icon}
                      />
                    </StatusLabel>

                    <StatusLabel
                      labelParameter={goldLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiCoins color="darkgoldenrod" className={styles.icon} />
                    </StatusLabel>
                  </Grid>

                  <Grid item xs style={{ marginLeft: 15 }}>
                    <StatusLabel
                      labelParameter={meleeLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiGladius color="navy" className={styles.icon} />
                    </StatusLabel>
                    <StatusLabel
                      labelParameter={rangedLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiHighShot color="darkgreen" className={styles.icon} />
                    </StatusLabel>
                    <StatusLabel
                      labelParameter={diagonalLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiArrowhead color="black" className={styles.icon} />
                    </StatusLabel>
                    <StatusLabel
                      labelParameter={defenceLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiCheckedShield
                        color="darkslateblue"
                        className={styles.icon}
                      />
                    </StatusLabel>
                    <StatusLabel
                      labelParameter={movementLabelParameter}
                      cardId={props.cardId}
                    >
                      <GiWalkingBoot color="brown" className={styles.icon} />
                    </StatusLabel>
                  </Grid>
                </Grid>
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

        <Collapsible
          trigger={
            <CollapsibleTriggerLabel
              labelText={"Armory items"}
              icon={<ArrowDropDown />}
            />
          }
          triggerWhenOpen={
            <CollapsibleTriggerLabel
              labelText={"Armory items"}
              icon={<ArrowDropUp />}
            />
          }
          className={styles.collabsibleOpened}
          openedClassName={styles.collabsibleOpened}
          transitionTime={150}
        >
          {armoryItemListItems}
        </Collapsible>
      </Card>
    </>
  );
};
