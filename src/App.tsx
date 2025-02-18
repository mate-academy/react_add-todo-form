import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

import { Todo } from './types/Todo';

import { getUserById } from './utils/getUserById';

const neededTodos = todosFromServer.map((todo: Todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(neededTodos);

  const addTodo = (todo: Todo) => {
    setTodos(currentTodos => [...currentTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAdd={addTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
