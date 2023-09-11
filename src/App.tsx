import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/Form/TodoForm';

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  const user = usersFromServer.find(({ id }) => id === todo.userId) || null;

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
