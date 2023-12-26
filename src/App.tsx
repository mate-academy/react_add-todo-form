import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { getUserByTodo } from './services/posts';
import { Todo } from './types';

const getPostsWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByTodo(todo.userId),
}));

const getNewTodoID = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => getPostsWithUsers);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoID(todos),

    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
