import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { PostForm } from './components/PostForm/PostForm';
import { getUser } from './services/user';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function getNewTodoId(todoList: Todo[]) {
  const maxId = Math.max(...todoList.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>(todos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: id || getNewTodoId(todosList),
      ...data,
    };

    setTodosList(currentList => [...currentList, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <PostForm onSubmit={addTodo} />
      <TodoList todos={todosList} />
    </div>
  );
};
