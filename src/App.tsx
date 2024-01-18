import './App.scss';
import { useState } from 'react';

import { initialTodos } from './services/initialTodos';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { Form } from './components/Form/Form';

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [date, setDate] = useState(+new Date());

  const addTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
    setDate(+new Date());
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onAdd={addTodo} key={date} />

      <TodoList todos={todos} />
    </div>
  );
};
