import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/todo';
import { User } from './types/user';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const users: User[] = usersFromServer;

const initialTodos: Todo[] = todosFromServer;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} users={users} />
    </div>
  );
};
