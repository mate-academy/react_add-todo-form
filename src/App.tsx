import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './components/services/getUserById';
import { Todo } from './components/types/Todo';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function idTodo(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAdd = (todo: Todo) => {
    const newTodo = { ...todo, id: idTodo(todos) };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={onAdd} />
      <TodoList todos={todos} />
    </div>
  );
};
