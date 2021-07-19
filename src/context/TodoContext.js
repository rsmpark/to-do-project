import { useState, useEffect, createContext } from 'react';

import db from '../firebase-config';
import firebase from 'firebase';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection('todos')
      .orderBy('datetime', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datetime: snapshot.metadata.hasPendingWrites ? new Date() : doc.data().datetime.toDate(),
            };
          })
        );
      });
  }, []);

  const addTodo = (input) => {
    db.collection('todos').add({
      todo: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteTodo = (id) => {
    db.collection('todos')
      .doc(id)
      .delete()
      .then((res) => {
        console.log('Deleted!', res);
      });
  };

  const todoContext = {
    todos: todos,
    deleteTodo: deleteTodo,
    addTodo: addTodo,
  };

  return <TodoContext.Provider value={todoContext}>{props.children}</TodoContext.Provider>;
};
