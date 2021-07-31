import React, { useState, useContext } from 'react';
import { DeleteOutlineRounded, Edit } from '@material-ui/icons';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import EditTodo from './EditTodo';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [toUpdateId, setToUpdateId] = useState('');

  const todoCtx = useContext(TodoContext);

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List dense={true}>
        {todoCtx.todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.name} secondary={todo.datetime.toString()} />

            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='Edit' onClick={() => openUpdateDialog(todo)}>
                <Edit />
              </IconButton>
              <IconButton edge='end' aria-label='delete' onClick={() => todoCtx.deleteTodo(todo.id)}>
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <EditTodo
        open={open}
        close={handleClose}
        update={update}
        toUpdateId={toUpdateId}
        setUpdate={setUpdate}
      />
    </div>
  );
}
