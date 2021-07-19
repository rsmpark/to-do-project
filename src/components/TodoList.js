import React, { useState, useEffect, useContext } from 'react';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteOutlineRounded, Edit } from '@material-ui/icons';

import UpdateTodo from './UpdateTodo';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const todoCtx = useContext(TodoContext);

  const openUpdateDialog = (todo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <List dense={true}>
        {todoCtx.todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.name} secondary={todo.datetime.toLocaleString()} />
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
      <UpdateTodo open={isOpen} close={handleClose} todo={selectedTodo} />
    </div>
  );
}
