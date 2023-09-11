import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './interfaces/Todo';
import { User } from './interfaces/User';

function findUserById(users: User[], id: number): User | null {
  return users.find((user: User) => user.id === id) || null;
}

const todosWithUsers: Todo[] = todosFromServer
  .map((todo: Todo) => {
    return {
      ...todo,
      user: findUserById(usersFromServer, todo.userId),
    };
  });

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos]
    = useState<Todo[]>(todosWithUsers);

  const handleAddTodo = (title: string, selectedUserId:number) => {
    setVisibleTodos((prevTodos) => {
      const maxId = Math.max(...prevTodos.map(({ id }) => id));

      return [
        ...prevTodos,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: selectedUserId,
          user: findUserById(usersFromServer, selectedUserId),
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={handleAddTodo} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};
