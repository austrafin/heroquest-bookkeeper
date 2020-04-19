import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Grid, Button, Modal } from "@material-ui/core";
import { initialise } from "./actions/statusPoints";
import PlayerCard from "./PlayerCard";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./GamePage.module.css";

function calculateStatusPoints(item, values, pointsKey, operatorKey) {
  let add = 0;
  if (item[pointsKey] > values[pointsKey] && item[operatorKey] === "=") {
    values[pointsKey] = item[pointsKey];
  } else if (item[operatorKey] === "+") {
    add += item[pointsKey];
  } else if (item[operatorKey] === "-") {
    add -= item[pointsKey];
  }

  values[pointsKey] += add;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const GamePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const [hasLoaded, setLoaded] = useState(null);
  const [cards, setCards] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const initialValues = {};
    const cardsArr = [];

    axios
      .get("http://localhost:5000/player_cards")
      .then((response) => {
        response.data.forEach((card) => {
          let image = "./no_image.webp";
          const values = {};
          values["bodyPoints"] = card.bodyPoints;
          values["mindPoints"] = card.mindPoints;
          values["meleePoints"] = card.baseMeleePoints;
          values["rangedPoints"] = card.baseRangedPoints;
          values["diagonalPoints"] = card.baseDiagonalPoints;
          values["defencePoints"] = card.baseDefencePoints;
          values["movementPoints"] = card.baseMovementPoints;
          values["gold"] = card.gold;
          values["armoryItems"] = card.armoryItems;

          card.armoryItems.forEach((item) => {
            calculateStatusPoints(item, values, "meleePoints", "meleeOperator");
            calculateStatusPoints(
              item,
              values,
              "rangedPoints",
              "rangedOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "diagonalPoints",
              "diagonalOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "defencePoints",
              "defenceOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "movementPoints",
              "movementOperator"
            );
          });

          initialValues[card._id] = values;

          if (card.imagePath !== undefined) {
            const base64 = btoa(
              new Uint8Array(card.imageFile.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            image = "data:image/png;base64," + base64;
          }

          cardsArr.push(
            <Grid item xs key={card._id} className={styles.root}>
              <PlayerCard
                imagePath={image}
                characterName={card.characterName}
                cardId={card._id}
              />
            </Grid>
          );
        });

        stableDispatch(initialise(initialValues));
        setLoaded(true);
        setCards(cardsArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stableDispatch]);

  if (!hasLoaded) {
    return "Loading...";
  }

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <>
      <Button
        style={{ backgroundColor: "blue", marginBottom: "10px" }}
        onClick={handleOpen}
      >
        Add character
      </Button>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Grid container spacing={4}>
        {cards}
      </Grid>
    </>
  );
};

export default GamePage;
