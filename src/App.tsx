import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { AddUser } from './components/AddUser/AddUser';
import { findUserById } from './utils/FindUserById';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

initialTodos.sort((todo1, todo2) => todo1.id - todo2.id);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleAddTodo(newTodo: Todo) {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddUser onAdd={handleAddTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
