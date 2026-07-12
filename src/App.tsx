import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { User } from './types/Users';

export const todosWithUsers: Todo[] = todosFromServer.map(currentTodo => {
  const user = usersFromServer.find(
    person => person.id === currentTodo.userId,
  ) as User;

  return { ...currentTodo, user };
});

export const App = () => {
  const [todose, setTodose] = useState(todosWithUsers);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        onAdd={(title: string, userId: number) => {
          const user = usersFromServer.find(
            person => person.id === userId,
          ) as User;

          setTodose(prevTodos => {
            const ids = prevTodos.map(existingTodo => existingTodo.id);
            const maxId = Math.max(...ids);
            const newId = maxId + 1;
            const newTodo = {
              id: newId,
              title: title,
              completed: false,
              userId: userId,
              user: user,
            };

            return [...prevTodos, newTodo];
          });
        }}
      />

      <TodoList todos={todose} />
    </div>
  );
};
