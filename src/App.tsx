import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import TodoAddForm from './components/TodoAddForm/TodoAddFrom';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todos';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || undefined;
}

const updateTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(updateTodos);

  const addNewTodo = (newTodo: Todo): void => {
    const todo = {
      ...newTodo,
      id: Math.max(...todos.map(item => item.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoAddForm
        addTodo={addNewTodo}
        getUserById={getUserById}
        users={usersFromServer}
      />
      <TodoList todos={todos} />
    </div>
  );
};
