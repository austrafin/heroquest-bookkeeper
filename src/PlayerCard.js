import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatusModifier from "./StatusModifier";
import styles from "./PlayerCard.module.css";
import StatusLabel from "./StatusLabel";
import PlayerCardForm from "./PlayerCardForm";
import {
  uploadImage,
  setSelectedImageFile,
  addArmoryItem,
  updateBaseValues,
} from "./actions/playerCards";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Collapsible from "react-collapsible";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import {
  ArrowDropDown,
  ArrowDropUp,
  PhotoCamera,
  CheckCircle,
  Cancel,
  AddBox,
  Settings,
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "70%",
    },
  }));

  const classes = useStyles();

  const cardData = useSelector(
    (state) => state.playerCards.cardData[props.cardId]
  );
  const armoryItems = useSelector(
    (state) => state.playerCards.cardData[props.cardId].armoryItems
  );
  const bodyLabelParameter = "bodyPoints";
  const mindLabelParameter = "mindPoints";
  const meleeLabelParameter = "meleePoints";
  const rangedLabelParameter = "rangedPoints";
  const diagonalLabelParameter = "diagonalPoints";
  const defenceLabelParameter = "defencePoints";
  const movementLabelParameter = "movementPoints";
  const goldLabelParameter = "gold";
  const [imageFile, setImageFile] = useState(props.imagePath);
  const [armoryItemSelection, setArmoryItemSelection] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedFile = useSelector(
    (state) => state.playerCards.cardData[props.cardId].selectedImageFile
  );
  const armoryItemsData = useSelector((state) => state.armoryItems);
  const browseImageId = "browse-image-" + props.cardId;
  const settingsId = "settings-" + props.cardId;
  let imageUploadInputs = null;
  let armoryItemListItems = [];
  let armoryItemsSelectList = [];

  const handleCancel = () => {
    dispatch(setSelectedImageFile(null, props.cardId));
    setImageFile(props.imagePath);
  };

  const handleImageUpload = () => {
    dispatch(uploadImage(selectedFile, props.cardId));
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
      dispatch(setSelectedImageFile(file, props.cardId));
    }
  };

  const handleArmoryItemSelectionChange = (event) => {
    setArmoryItemSelection(event.target.value);
  };

  const handleArmoryItemButtonClick = () => {
    dispatch(addArmoryItem(props.cardId, armoryItemSelection));
  };

  const handleCardSettingsButtonClick = () => {
    setModalOpen(true);
  };

  const submit = (event) => {
    const data = {};

    [...event.target].forEach((input) => {
      if (input.name !== "") data[input.name] = input.value;
    });

    dispatch(updateBaseValues(data, props.cardId));
  };

  if (selectedFile && selectedFile !== null) {
    const uploadId = "upload-image-" + props.cardId;
    const cancelId = "cancel-image-" + props.cardId;
    imageUploadInputs = (
      <>
        <input
          id={uploadId}
          className={styles.uploadbutton}
          onClick={handleImageUpload}
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
    armoryItemListItems = armoryItems.map((item, key) => (
      <CollapsibleTriggerLabel
        key={key}
        labelText={armoryItemsData.items[item].name}
      />
    ));
  }

  if (armoryItemsData !== undefined) {
    armoryItemsSelectList = Object.entries(armoryItemsData.items).map(
      ([key, item]) => (
        <MenuItem key={key} value={item._id}>
          {item.name}
        </MenuItem>
      )
    );
  }

  armoryItemListItems.push(
    <CollapsibleTriggerLabel
      key={"add_armory_item"}
      labelText={
        <>
          <IconButton
            style={{ marginTop: 15 }}
            onClick={handleArmoryItemButtonClick}
            color="primary"
          >
            <AddBox />
          </IconButton>
          <FormControl className={classes.formControl}>
            <InputLabel>Artifact</InputLabel>
            <Select
              value={armoryItemSelection}
              onChange={handleArmoryItemSelectionChange}
            >
              {armoryItemsSelectList}
            </Select>
          </FormControl>
        </>
      }
    />
  );

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
                  title={cardData.characterName}
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
                <Grid container direction="row">
                  <Grid item xs>
                    <MuiThemeProvider theme={theme}>
                      <Typography variant="h4">
                        {cardData.characterName}
                      </Typography>
                    </MuiThemeProvider>
                  </Grid>
                  <Grid item xs>
                    <div className={styles.container}>
                      <input
                        id={settingsId}
                        className={styles.settingsbutton}
                        type="button"
                        onClick={handleCardSettingsButtonClick}
                      />

                      <label htmlFor={settingsId}>
                        <IconButton
                          className={styles.settingsbutton}
                          color="primary"
                          component="span"
                        >
                          <Settings />
                        </IconButton>
                      </label>
                    </div>
                  </Grid>
                </Grid>

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

      <PlayerCardForm
        cardId={props.cardId}
        title="Modify Player Card"
        submitFunction={submit}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        delete={true}
        characterName={cardData.characterName}
        baseBodyPoints={cardData.baseBodyPoints}
        baseMindPoints={cardData.baseMindPoints}
        baseMeleePoints={cardData.baseMeleePoints}
        baseRangedPoints={cardData.baseRangedPoints}
        baseDiagonalPoints={cardData.baseDiagonalPoints}
        baseDefencePoints={cardData.baseDefencePoints}
        baseMovementPoints={cardData.baseMovementPoints}
      />
    </>
  );
};
