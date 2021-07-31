import React, { useState, useContext } from 'react';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';

import { TodoContext } from '../context/TodoContext';

export default function AddTodo() {
  const [input, setInput] = useState('');

  const todoCtx = useContext(TodoContext);

  const addTodo = (event) => {
    todoCtx.addTodo(event, input);
    setInput('');
  };

  return (
    <form noValidate>
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
        onClick={addTodo}
        disabled={!input}
        startIcon={<AddCircleOutlineRounded />}>
        Add Todo
      </Button>
    </form>
  );
}
