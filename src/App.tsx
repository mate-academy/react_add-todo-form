import './App.scss';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
// import usersFromServer from './api/users';
import { Todos } from './types/Types';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos] = useState<Todos[]>(todosFromServer);
  // const [newTodos, setNewTodos] = useState({
  //   title: '',
  //   description: '',
  //   titleError: false,
  //   descriptionError: false,
  // });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <TodoInfo />
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
