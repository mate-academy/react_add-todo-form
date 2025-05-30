import './App.scss';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

function getUsers(userId: number) {
  return usersFromServer.find(user => user.id === userId)!;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUsers(todo.userId),
}));

export const App = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (newTodo: Todo) => {
    setAllTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        users={usersFromServer}
        onAddTodo={handleAddTodo}
        currentTodos={allTodos}
      />

      <TodoList todos={allTodos} />
    </div>
  );
};
