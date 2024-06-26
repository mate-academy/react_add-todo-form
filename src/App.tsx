import { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ToDo } from './components/Types/ToDo';
import { Form } from './components/Form/Form';

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} />
    </div>
  );
};
