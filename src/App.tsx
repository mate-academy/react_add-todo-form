import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import { getUserById } from './services/UserService';
import { getLargestId } from './services/IdServices';
import { Todo } from './types/Todo';

const initialsTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialsTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const largestId = getLargestId(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodo={addTodo} largestId={largestId} />
      <TodoList todos={todos} />
    </div>
  );
};
