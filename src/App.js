import './App.css';

import { Container } from '@material-ui/core';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container maxWidth='sm'>
      <form noValidate>
        <AddTodo />
        <TodoList />
      </form>
    </Container>
  );
}

export default App;
