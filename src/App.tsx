import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
