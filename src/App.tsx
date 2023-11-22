import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Types';
import { getUserById } from './utils/userId';
import { Form } from './components/Form';

import todosFromServer from './api/todos';
import './App.scss';

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map((todo) => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [newTodos, setNewTodos] = useState(initialTodos);

  function getNewTodoId(todos: Todo[]) {
    const maxId = Math.max(...todos.map((todo) => todo.id));

    return maxId + 1;
  }

  function addNewTodo(todo: Todo) {
    const newTodo = {
      ...todo,
      id: getNewTodoId(newTodos),
    };

    setNewTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onSubmit={newTodo => addNewTodo(newTodo)} />

      <TodoList todos={newTodos} />
    </div>
  );
};
