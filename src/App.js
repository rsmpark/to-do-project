import './App.css';

import { Container } from '@material-ui/core';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <Container maxWidth='sm'>
      <TodoProvider>
        <form noValidate>
          <AddTodo />
        </form>
        <TodoList />
      </TodoProvider>
    </Container>
  );
}

export default App;
