//#region imports
import React, { useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
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

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: id || getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
