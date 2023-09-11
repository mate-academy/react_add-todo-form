import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './interfaces/Todo';
import { User } from './interfaces/User';

const todosWithUsers: Todo[] = todosFromServer
  .map((todo: Todo) => {
    return {
      ...todo,
      user: usersFromServer
        .find((user: User) => user.id === todo.userId) || null,
    };
  });

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos]
    = useState<Todo[]>(todosWithUsers);

  const onAddHendler = (title: string, selectedUserId:number) => {
    setVisibleTodos((prevTodos) => {
      const maxId: number = Math.max(...prevTodos.map(todo => todo.id));

      return [
        ...prevTodos,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: selectedUserId,
          user: usersFromServer.find(user => user.id === selectedUserId)
            || null,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={onAddHendler} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};
