import React, { useState, useEffect } from 'react';

import { Button, TextField, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import db from '../firebase-config';

export default function UpdateTodo(props) {
  const [updatedTodo, setUpdatedTodo] = useState(props.todo);

  useEffect(() => {
    setUpdatedTodo(props.todo);
  }, [props.todo]);

  const editTodo = () => {
    db.collection('todos').doc(updatedTodo.id).update({
      todo: updatedTodo.name,
    });
    props.close();
  };

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogContent>
        <TextField
          autoFocus
          margin='normal'
          label='Update Todo'
          type='text'
          fullWidth
          name='updateTodo'
          value={updatedTodo.name}
          onChange={(event) => setUpdatedTodo({ ...updatedTodo, name: event.target.val })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color='primary'>
          Cancel
        </Button>
        <Button color='primary' onClick={editTodo}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
