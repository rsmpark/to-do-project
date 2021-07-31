import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { TodoProvider } from './context/TodoContext';

import { Container } from '@material-ui/core';

function App() {
  return (
    <Container maxWidth='sm'>
      <TodoProvider>
        <AddTodo />
        <TodoList />
      </TodoProvider>
    </Container>
  );
}

export default App;
