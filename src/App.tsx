import './App.scss';
import React, { useState } from 'react';

import { Todos } from './types/Todo';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PostForm } from './components/TodoForm/PostForm';
import { getUserById } from './services/user';
import { getNewTodsId } from './services/getNewTodsId';

export const App: React.FC = () => {
  const initialTodos: Todos[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todoWithUser, setTodoWithUser] = useState<Todos[]>(initialTodos);

  const onAddTodo = (todo: Omit<Todos, 'id'>) => {
    const newTodo = {
      ...todo,
      id: getNewTodsId(todoWithUser),
    };

    setTodoWithUser(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={onAddTodo} />
      <TodoList todos={todoWithUser} />
    </div>
  );
};
