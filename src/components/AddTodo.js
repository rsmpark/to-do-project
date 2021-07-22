import React, { useState } from 'react';

import db from '../firebase-config';
import firebase from 'firebase';

import { AddCircleOutlineRounded } from '@material-ui/icons';

import { Button, TextField } from '@material-ui/core';

const AddTodo = (props) => {
  const [input, setInput] = useState('');

  const addTodo = (event) => {
    db.collection('todos').add({
      todo: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='todo'
        label='Enter ToDo'
        name='todo'
        autoFocus
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        onClick={(event) => {
          event.preventDefault();
          addTodo(input);
        }}
        disabled={!input}
        startIcon={<AddCircleOutlineRounded />}>
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
