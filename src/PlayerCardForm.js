import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import NumberInput from "./NumberInput";
import { Grid, Button, Modal, TextField } from "@material-ui/core";
import { deletePlayerCard } from "./actions/playerCards";

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

export default (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    props.setModalOpen(false);
  };

  const submit = (event) => {
    props.submitFunction(event);

    handleClose();
    event.preventDefault();
  };

  let deleteButton = null;

  if (props.delete)
    deleteButton = (
      <Button
        style={{
          backgroundColor: "red",
          marginTop: "10px",
          marginLeft: "10px",
        }}
        onClick={() => {
          dispatch(deletePlayerCard(props.cardId));
        }}
      >
        Delete character
      </Button>
    );

  return (
    <Modal open={props.modalOpen} onClose={handleClose}>
      <div className={classes.paper}>
        <h2>{props.title}</h2>
        <form onSubmit={submit} method="POST">
          <Grid container direction="column">
            <TextField
              name="characterName"
              label="Name"
              required
              value={props.characterName}
            />
            <NumberInput
              name="baseBodyPoints"
              labelText={"Base body points"}
              defaultValue={props.baseBodyPoints}
            />
            <NumberInput
              name="baseMindPoints"
              labelText={"Base mind points"}
              defaultValue={props.baseMindPoints}
            />
            <NumberInput
              name="baseMeleePoints"
              labelText={"Base melee attack points"}
              defaultValue={props.baseMeleePoints}
            />
            <NumberInput
              name="baseRangedPoints"
              labelText={"Base ranged attack points"}
              defaultValue={props.baseRangedPoints}
            />
            <NumberInput
              name="baseDiagonalPoints"
              labelText={"Base diagonal attack points"}
              defaultValue={props.baseDiagonalPoints}
            />
            <NumberInput
              name="baseDefencePoints"
              labelText={"Base defence points"}
              defaultValue={props.baseDefencePoints}
            />
            <NumberInput
              name="baseMovementPoints"
              labelText={"Base movement points"}
              defaultValue={props.baseMovementPoints}
            />
          </Grid>

          <Button
            type="submit"
            style={{ backgroundColor: "blue", marginTop: "10px" }}
          >
            Submit
          </Button>
          {deleteButton}
        </form>
      </div>
    </Modal>
  );
};
