import './App.scss';

import todosFromServer from './api/todos';
import { Form } from './components/Form/form';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo, User } from './components/Types/types';
import usersFromServer from './api/users';

export function getUserById(id: number): User | null {
  const usr = usersFromServer.find((user: User) => {
    if (user.id === id) {
      return true;
    }

    return false;
  });

  if (!usr) {
    return null;
  }

  return usr;
}

export const App = () => {
  const modifiedTodos: Todo[] = todosFromServer.map(td => {
    const copy = { ...td };

    copy.user = getUserById(copy.userId);

    return copy;
  });

  const [todos, setTodos] = useState<Todo[]>(modifiedTodos);
  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onAdd={onAdd} todos={todos} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};
