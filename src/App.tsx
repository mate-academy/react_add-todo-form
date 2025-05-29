import React, { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { getNewTodoId } from './services/getNewTodoId';

const allTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(allTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form todos={todos} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
