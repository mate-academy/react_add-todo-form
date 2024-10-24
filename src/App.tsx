import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const App = () => {
  const [todoList, setTodoList] = useState(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm todos={todosFromServer} updateTodoList={setTodoList} />
      <TodoList todos={todoList} />
    </div>
  );
};
