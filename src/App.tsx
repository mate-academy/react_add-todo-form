import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { getUsersById } from './utils/getUserById';
import './App.scss';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUsersById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <div className="App">
      <h1 className="title main_title">Add todo form</h1>

      <AddTodoForm setTodos={setTodos} />

      <TodoList todos={todos} />
    </div>
  );
};
