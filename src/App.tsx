import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './utils/getUserById';
import { Todo, Todos } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

const initialTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todos>(initialTodos);

  const addTodo = (todo: Todo): void => {
    setTodos((prev) => {
      return [
        ...prev, {
          ...todo,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onSubmit={addTodo}
        users={usersFromServer}
        todosArr={todos}
      />

      <TodoList todos={todos} />
    </div>
  );
};
