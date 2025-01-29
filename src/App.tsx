import './App.scss';
import { Todo } from './types';
import { TodoList } from './components/TodoList/';
import { AddToDoForm } from './components/AddToDoForm/AddToDoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);

  const addNewTodo = (title: string, userId: number): void => {
    const id: number = Math.max(...todoList.map(todo => todo.id), 0) + 1;

    setTodoList(prevTodoList => [
      ...prevTodoList,
      { userId, id, title, user: getUserById(userId), completed: false },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddToDoForm addTodo={addNewTodo} users={usersFromServer} />
      <TodoList todoList={todoList} />
    </div>
  );
};
