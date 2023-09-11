import React, { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/Form/TodoForm';
import { getUserById } from './utils/utils';

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  const user = getUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodo: Todo[]) => ([...prevTodo, newTodo]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onAddTodo={handleAddTodo}
        todos={todos}
      />
      <TodoList todos={todos} />
    </div>
  );
};
