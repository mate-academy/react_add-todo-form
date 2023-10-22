import React, { useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import todosFromServer from './api/todos';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { ...newTodo, id: getNewTodoId(prevTodos) },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
