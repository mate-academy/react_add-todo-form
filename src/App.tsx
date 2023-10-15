import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/Todo';

const todosList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosList);

  const getTodoId = (allTodos: Todo[]) => {
    const newId = Math.max(...allTodos.map(todo => todo.id)) + 1;

    return newId;
  };

  const onAdd = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getTodoId(todos),
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAdd={onAdd} />

      <TodoList todos={todos} />
    </div>
  );
};
