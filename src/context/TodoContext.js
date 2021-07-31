import { useState, useEffect, createContext } from 'react';

import db from '../firebase-config';
import firebase from 'firebase';

export const TodoContext = createContext({
  todos: [{ id: '', name: '', datetime: new Date() }],
  deleteTodo: (id) => {},
  addTodo: (input) => {},
});

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([{ id: '', name: '', datetime: new Date() }]);

  useEffect(() => {
    db.collection('todos')
      .orderBy('datetime', 'desc')
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setTodos(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                name: doc.data().todo,
                datetime: snapshot.metadata.hasPendingWrites ? new Date() : doc.data().datetime.toDate(),
              };
            })
          );
        }
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

  const editTodo = (id, name) => {
    db.collection('todos').doc(id).update({
      todo: name,
    });
  };

  const todoContext = {
    todos: todos,
    deleteTodo: deleteTodo,
    addTodo: addTodo,
    editTodo: editTodo,
  };

  return <TodoContext.Provider value={todoContext}>{props.children}</TodoContext.Provider>;
};
