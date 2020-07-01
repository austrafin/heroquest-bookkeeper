import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NumberInput from "./NumberInput";
import { Grid, Button, Modal, TextField } from "@material-ui/core";

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
  const classes = useStyles();

  const handleClose = () => {
    props.setModalOpen(false);
  };

  const submit = (event) => {
    console.log("asd");
    console.log(props);
    props.submitFunction(event);

    handleClose();
    event.preventDefault();
  };

  return (
    <Modal open={props.modalOpen} onClose={handleClose}>
      <div className={classes.paper}>
        <h2>{props.title}</h2>
        <form onSubmit={submit} method="POST">
          <Grid container direction="column">
            <TextField name="characterName" label="Name" required />
            <NumberInput name="baseBodyPoints" labelText={"Base body points"} />
            <NumberInput name="baseMindPoints" labelText={"Base mind points"} />
            <NumberInput
              name="baseMeleePoints"
              labelText={"Base melee attack points"}
            />
            <NumberInput
              name="baseRangedPoints"
              labelText={"Base ranged attack points"}
            />
            <NumberInput
              name="baseDiagonalPoints"
              labelText={"Base diagonal attack points"}
            />
            <NumberInput
              name="baseDefencePoints"
              labelText={"Base defence points"}
            />
            <NumberInput
              name="baseMovementPoints"
              labelText={"Base movement points"}
            />
          </Grid>

          <Button
            type="submit"
            style={{ backgroundColor: "blue", marginTop: "10px" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};
