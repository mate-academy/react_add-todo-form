import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(selectedUser: number): User {
  return usersFromServer.find(userX => userX.id === selectedUser) as User;
}

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: findUserById(todo.userId)!,
    })),
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm setVisibleTodos={setVisibleTodos} visibleTodos={visibleTodos} />
      <TodoList todos={visibleTodos} />
    </div>
  );
};
