import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const preparedToDos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(preparedToDos);

  const addTodoHandler = (newTodo: Omit<TodoWithUser, 'id'>) => {
    const todosIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todosIds);

    const preparedTodo = {
      ...newTodo,
      id: maxTodoId + 1,
    };

    setTodos((prevTodos) => [...prevTodos, preparedTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodoHandler={addTodoHandler} />

      <TodoList todos={todos} />
    </div>
  );
};
