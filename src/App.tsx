import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { UsersToDos } from './types/ToDo';
import { getUserById } from './services/user';
import { TodoForm } from './components/TodoForm/TodoForm';

export const initialTodos: UsersToDos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setToDos] = useState<UsersToDos[]>(initialTodos);

  const addTodo = (newTodo: UsersToDos) => {
    setToDos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
