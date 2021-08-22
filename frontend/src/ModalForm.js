import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";

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

  return (
    <Modal open={props.modalOpen} onClose={props.handleClose}>
      <div className={classes.paper}>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </Modal>
  );
};
