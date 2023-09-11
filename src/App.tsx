import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { PreparedTodo } from './types';

import { TodoAddForm } from './components/TodoAddForm';
import { TodoList } from './components/TodoList';
import { findUserById } from './components/helpers';

const preparedTodoTasks: PreparedTodo[] = todosFromServer
  .map((todo) => ({
    ...todo,
    user: findUserById(todo.userId, usersFromServer),
  }));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodoTasks);

  const handleAddTodo = (newTask: PreparedTodo): void => {
    setTodos((prevState) => [...prevState, newTask]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoAddForm
        todos={todos}
        onAddTodo={handleAddTodo}
      />
      <TodoList todos={todos} />
    </div>
  );
};
