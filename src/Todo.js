import React, { useState } from 'react';
import { Button, Input, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import db from './firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const [input, setInput] = useState(props.todo.content);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTodo = (event) => {
    event.preventDefault();

    db.collection('todos').doc(props.todo.id).delete();

    console.log('delete');
  }

  const updateTodo = (event) => {
    event.preventDefault();

    db.collection('todos').doc(props.todo.id).set({
      content: input
    }, { merge: true });

    handleClose()
  }

  return (
    <div className="todo">
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button
            onClick={updateTodo}
          >
            Update
          </Button>
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.todo.content} secondary='締め切り' />
        </ListItem>
      </List>
      <Button
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Button onClick={deleteTodo}>
        <DeleteForeverIcon />
      </Button>
    </div>
  )
}

export default Todo;
