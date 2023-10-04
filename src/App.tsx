import React, { useState } from 'react';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import { getUserById } from './servises/UserById';
import todosFromServer from './api/todos';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
