import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getIdForTodo = (todos: Todo[]) => {
  let biggest = 0;

  todos.forEach(todo => {
    if (todo.id > biggest) {
      biggest = todo.id;
    }
  });

  return biggest + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [titleInput, setTitleInput] = useState('');
  const [titleInputError, setTitleInputError] = useState(false);
  const [userSelect, setUserSelect] = useState(0);
  const [userSelectError, setUserSelectError] = useState(false);

  const clearForm = () => {
    setTitleInput('');
    setUserSelect(0);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = titleInput.trim();

    if (!trimedTitle || userSelect === 0) {
      if (!trimedTitle) {
        setTitleInputError(true);
      }

      if (userSelect === 0) {
        setUserSelectError(true);
      }

      return;
    }

    const todo: Todo = {
      id: getIdForTodo(todos),
      title: titleInput,
      completed: false,
      userId: userSelect,
      user: getUser(userSelect),
    };

    setTodos(prevTodos => [...prevTodos, todo]);
    clearForm();
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleInputError) {
      setTitleInputError(false);
    }

    setTitleInput(event.target.value.replace(/[^a-zа-я0-9\s]/gi, ''));
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (userSelectError) {
      setUserSelectError(false);
    }

    setUserSelect(+event.target.value);
  };

  return (
    <section className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={handleOnInput}
            placeholder="Enter a title here"
          />

          {titleInputError && (
            <p className="error">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="select"
            onChange={handleOnSelect}
            value={userSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }: User) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {userSelectError && (
            <p className="error">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <div className="TodoList">
        <TodoList todos={todos} />
      </div>
    </section>
  );
};
