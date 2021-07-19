import React, { useState, useContext } from 'react';

import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';

import { TodoContext } from '../context/TodoContext';

const AddTodo = (props) => {
  const [input, setInput] = useState('');
  const todoCtx = useContext(TodoContext);

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
          todoCtx.addTodo(input);
          setInput('');
        }}
        disabled={!input}
        startIcon={<AddCircleOutlineRounded />}>
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
