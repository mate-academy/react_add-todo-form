import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Users } from './types/Users';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): Users | null {
  return usersFromServer.find(person => person.id === userId) || null;
}

const todos: Todos[] = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return { ...todo, user };
});

function getNewTodoId(items: Todos[]) {
  const maxId = Math.max(...items.map(item => item.id));

  return maxId + 1;
}

export const App = () => {
  const [todoses, setTodoses] = useState<Todos[]>(todos);
  const [title, setTitle] = useState<string>('');
  const [hasTitleEror, setHasTitleEror] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [hasUserEror, setHasUserEror] = useState<boolean>(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleEror(false);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserEror(false);
  };

  const onAdd = (newTodo: Todos) => {
    const currentTodo = {
      ...newTodo,
      id: getNewTodoId(todoses),
    };

    setTodoses(currentTodos => [...currentTodos, currentTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleEror(false);
    setHasUserEror(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleEror(!title);
    setHasUserEror(!userId);
    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">
            Name:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={onTitleChange}
            />
          </label>
          {hasTitleEror && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="">
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={onUserIdChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasUserEror && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoses} />
    </div>
  );
};
