import React, { useState, useEffect, useContext } from 'react';

import { Button, TextField, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { TodoContext } from '../context/TodoContext';

export default function UpdateTodo(props) {
  const todoCtx = useContext(TodoContext);
  let selectedTodo = todoCtx.todos[props.selectedIdx];

  const [todoName, setTodoName] = useState('');

  useEffect(() => {
    console.log('useEffect');
    setTodoName(selectedTodo ? selectedTodo.name : '');
  }, [selectedTodo]);

  if (todoCtx.todos.length > 0) {
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
            value={todoName}
            onChange={(event) => {
              setTodoName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color='primary'>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => {
              todoCtx.editTodo(selectedTodo.id, todoName);
              props.close();
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <div>Loading</div>;
  }
}
