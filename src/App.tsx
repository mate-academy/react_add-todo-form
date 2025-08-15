import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodos } from './components/NewTodos/NewTodos';
import { getUserById } from './services/user';
import { Todo } from './type/Todo';
import { useState } from 'react';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [user, setUser] = useState<Todo[]>(todos);

  const addUser = (newUser: Todo) => {
    setUser(currentUser => [...currentUser, newUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodos onSubmit={addUser} />
      <TodoList todos={user} />
    </div>
  );
};
