import { useState, useEffect, createContext } from 'react';
import db from '../firebase-config';
import firebase from 'firebase';

export const TodoContext = createContext({
  todoList: [{}],
  addTodo: () => {},
});

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
              datetime: doc.metadata.hasPendingWrites ? new Date() : doc.data().datetime.toDate(),
            };
          })
        );
      });
  }, []);

  const addTodo = (event, input) => {
    event.preventDefault();
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
        console.log('Delete successful!');
      })
      .catch((err) => {
        console.log(`Error occurred: ${err}`);
      });
  };

  const todoCtxData = {
    todoList: todos,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
  };

  return <TodoContext.Provider value={todoCtxData}>{props.children}</TodoContext.Provider>;
};
