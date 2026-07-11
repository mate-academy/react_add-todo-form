import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';

export const todosWithUsers: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [todose, setTodose] = useState(todosWithUsers);
  const ids = todose.map(todo => todo.id);
  const maxId = Math.max(...ids);
  const newId = maxId + 1;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        onAdd={(title: string, userId: number) => {
          const user = usersFromServer.find(person => person.id === userId);
          const td = {
            id: newId,
            title: title,
            completed: false,
            userId: userId,
            user: user,
          };

          setTodose([...todose, td]);
        }}
      />

      <TodoList todos={todose} />
    </div>
  );
};
