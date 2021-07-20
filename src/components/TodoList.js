import React, { useState, useEffect, useContext } from 'react';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteOutlineRounded, Edit } from '@material-ui/icons';

import UpdateTodo from './UpdateTodo';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const todoCtx = useContext(TodoContext);

  const openUpdateDialog = (idx) => {
    setIsOpen(true);
    setSelectedIdx(idx);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <List dense={true}>
        {todoCtx.todos.map((todo, idx) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.name} secondary={todo.datetime.toLocaleString()} />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='Edit' onClick={() => openUpdateDialog(idx)}>
                <Edit />
              </IconButton>
              <IconButton edge='end' aria-label='delete' onClick={() => todoCtx.deleteTodo(todo.id)}>
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <UpdateTodo open={isOpen} close={handleClose} selectedIdx={selectedIdx} />
    </div>
  );
}
