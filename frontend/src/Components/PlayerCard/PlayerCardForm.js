import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { REDUX_STORE_FIELDS as Constants } from "../../constants/player_card.constants";
import NumberInput from "../Common/NumberInput";
import ModalForm from "../Common/ModalForm";
import { Grid, Button, TextField } from "@material-ui/core";
import { deletePlayerCard } from "../../actions/playerCards";

const PlayerCardForm = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.characterName ?? "");

  const handleClose = () => {
    props.setModalOpen(false);
  };

  const submit = (event) => {
    props.submitFunction(event);

    handleClose();
    event.preventDefault();
  };

  const handleCharacterNameChange = (event) => {
    setName(event.target.value);
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
    <ModalForm
      title={props.title}
      modalOpen={props.modalOpen}
      handleClose={handleClose}
    >
      <form onSubmit={submit} method="POST" data-test="add-playercard-form">
        <Grid container direction="column">
          <TextField
            name={Constants.CHARACTER_NAME}
            label="Name"
            required
            value={name}
            onChange={handleCharacterNameChange}
          />
          <NumberInput
            name={Constants.BASE_BODY_POINTS}
            labelText={"Base body points"}
            defaultValue={props.baseBodyPoints}
          />
          <NumberInput
            name={Constants.BASE_MIND_POINTS}
            labelText={"Base mind points"}
            defaultValue={props.baseMindPoints}
          />
          <NumberInput
            name={Constants.BASE_MELEE_POINTS}
            labelText={"Base melee attack points"}
            defaultValue={props.baseMeleePoints}
          />
          <NumberInput
            name={Constants.BASE_RANGED_POINTS}
            labelText={"Base ranged attack points"}
            defaultValue={props.baseRangedPoints}
          />
          <NumberInput
            name={Constants.BASE_DIAGONAL_POINTS}
            labelText={"Base diagonal attack points"}
            defaultValue={props.baseDiagonalPoints}
          />
          <NumberInput
            name={Constants.BASE_DEFENCE_POINTS}
            labelText={"Base defence points"}
            defaultValue={props.baseDefencePoints}
          />
          <NumberInput
            name={Constants.BASE_MOVEMENT_POINTS}
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
    </ModalForm>
  );
};

export default PlayerCardForm;
