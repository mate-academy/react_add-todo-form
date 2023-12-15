import { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import { Todo } from './react-app-env';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        onAdd={addTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
