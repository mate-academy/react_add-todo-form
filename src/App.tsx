//#region imports
import React, { useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/user';
// #endregion

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const addTodo = ({ title, userId }: { title: string; userId: number }) => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
