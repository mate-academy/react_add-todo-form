import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import Form from './components/Form';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form updateState={setTodos} />

      <TodoList items={todos} />
    </div>
  );
};
