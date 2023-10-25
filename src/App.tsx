import React, { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { Form } from './components/Form';

const initialTodosList = todosFromServer.map(todo => todo);

function getNewUserId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodosList);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewUserId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
