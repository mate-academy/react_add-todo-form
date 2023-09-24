import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { Todo } from './components/types/todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { getUserById } from './components/services/userById';
import { getNewTodoId } from './components/services/newTodoId';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
