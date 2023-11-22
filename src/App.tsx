import './App.scss';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

function getUser(userId: number) {
  return usersFromServer.find(user => userId === user.id) || null;
}

function getNewTodoId(todos: Todo[]) {
  const todoIds = todos.flatMap(todo => {
    return todo.id ? todo.id : [];
  });

  return Math.max(...todoIds) + 1;
}

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
      user: getUser(todo.userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
