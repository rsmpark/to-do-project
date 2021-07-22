import React, { useState, useEffect } from 'react';

import db from '../firebase-config';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import { DeleteOutlineRounded, Edit } from '@material-ui/icons';

import UpdateTodo from './UpdateTodo';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  useEffect(() => {
    db.collection('todos')
      .orderBy('datetime', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datetime: doc.metadata.hasPendingWrites ? new Date() : doc.data().datetime.toDate(),
            };
          })
        );
      });
  }, []);

  const openUpdateDialog = (todo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const deleteTodo = (id) => {
    db.collection('todos')
      .doc(id)
      .delete()
      .then((res) => {
        console.log('Deleted!', res);
      });
  };
  return (
    <div>
      <List dense={true}>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.name} secondary={todo.datetime.toLocaleString()} />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='Edit' onClick={() => openUpdateDialog(todo)}>
                <Edit />
              </IconButton>
              <IconButton edge='end' aria-label='delete' onClick={() => deleteTodo(todo.id)}>
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
