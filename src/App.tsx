import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/todo';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

export const getUsersById = (id: number) =>
  usersFromServer.find(user => user.id === id);

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUsersById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const getLargestId = () => {
    const id = todos.map(todo => todo.id);

    return Math.max(...id);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="title main_title">Add todo form</h1>

      <AddTodoForm addTodo={addTodo} getLargestId={getLargestId} />

      <TodoList todos={todos} />
    </div>
  );
};
