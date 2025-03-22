import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { User } from './types/user';
import { AddTodoForm } from './components/AddTodoForm';

export const nullUser: User = {
  id: 0,
  name: 'unexistent user',
  username: 'none',
  email: 'none',
};

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || nullUser;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);
  const maxId = Math.max(...todoList.map(todo => todo.id));

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddTodoForm
        users={usersFromServer}
        onAdd={todo => setTodoList([...todoList, todo])}
        maxId={maxId}
      />
      <TodoList todos={todoList} />
    </div>
  );
};
