import React, { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { Todo } from './type/Todo';
import { getUserById } from './services';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
