import './App.scss';
import React, { useState } from 'react';
import { getPreparedTodos } from './api';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types';

export const initialTodos = getPreparedTodos();

function getNewTodoId(todos:PreparedTodo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App:React.FC = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>(initialTodos);

  const addTodo = (todo:PreparedTodo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
