import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo, getNewTodoId } from './components/NewTodo/NewTodo';

export const defaultTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  const addNewTodo = ({ id, ...data }: Todo) => {
    const newTodos = {
      ...data,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodos]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onSubmit={addNewTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
