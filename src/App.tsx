import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const enrichTodo = (todo: Todo) => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  });

  const todoData = todosFromServer.map(enrichTodo);

  const [todos, setTodos] = useState<Todo[]>(todoData);

  const addTodo = (newTodo: Todo) => {
    const fullTodo = enrichTodo(newTodo);

    setTodos(currentTodos => [...currentTodos, fullTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoInfo onAdd={addTodo} users={usersFromServer} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
