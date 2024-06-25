import { FC, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [todoList, setTodoList] = useState<ToDo[]>(todos);

  const handleAddTodo = (newTodo: ToDo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <TodoList todos={todoList} addNewTodo={handleAddTodo} />
    </div>
  );
};
