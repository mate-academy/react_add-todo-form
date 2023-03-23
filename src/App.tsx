import './App.scss';
import { useState } from 'react';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

function getMaximalId(todoes: Todo[]) {
  return Math.max(...todoes.map((todo) => todo.id)) + 1;
}

export const todoesList: Todo[] = [...todosFromServer].map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState<number>(0);
  const [todoes, setNewTodo] = useState(todoesList);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelected(Number(event.target.value));
  };

  const reset = () => {
    setTitle('');
    setSelected(0);
  };

  const addNewTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: getMaximalId(todoes),
      title,
      completed: false,
      userId: selected,
      user: getUser(selected),
    };

    setNewTodo([...todoes, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={addNewTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={+selected}
            onChange={handleChangeSelected}
          >
            <option disabled value={0}>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoes} />
    </div>
  );
};
