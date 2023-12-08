import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoType } from './types/TodoType';
import { TodoForm } from './components/TodoForm';
import { getUser } from './functions/getUser';

export const todos: TodoType[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todosList, setTodosList] = useState<TodoType[]>(todos);

  const formOnSubmit = (newTodo: TodoType) => {
    setTodosList((prev) => ([...prev, newTodo]));
  };

  const newTodoId = Math.max(...todosList.map(todo => todo.id)) + 1;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={formOnSubmit} newTodoId={newTodoId} />

      <TodoList todos={todosList} />
    </div>
  );
};
