import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo } from './types/PreparedTodo';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoAddForm } from './components/TodoAddForm';
import { findUserById } from './utils';

const preparedTodos: PreparedTodo[] = todosFromServer
  .map((todo: Todo) => {
    return {
      ...todo,
      user: findUserById(todo.userId, usersFromServer),
    };
  });

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);

  const handleAddTodo = (todo: PreparedTodo): void => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoAddForm
        todos={todos}
        users={usersFromServer}
        onAdd={handleAddTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
