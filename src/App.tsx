import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormTodo } from './components/FormTodo';
import { Todo } from './types';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <FormTodo onAdd={onAdd} user={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};
