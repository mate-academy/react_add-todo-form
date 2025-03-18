import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { ITodo, IUser, OnAddCallback } from './types/todo';

const users = [...usersFromServer];

const todos: ITodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const getNextId = (list: ITodo[]): number => {
  return Math.max(...list.map(item => item.id)) + 1;
};

const getUser = (id: number, userList: IUser[]): IUser | undefined =>
  userList.find(user => user.id === id);

export const App = () => {
  const [todoList, setTodoList] = useState(todos);

  const handleAddTodo: OnAddCallback = ({ title, userId }) => {
    const newTodo: ITodo = {
      id: getNextId(todoList),
      title,
      userId,
      completed: false,
      user: getUser(userId, users),
    };

    setTodoList(list => [...list, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={users} onAdd={handleAddTodo} />
      <TodoList todos={todoList} />
    </div>
  );
};
