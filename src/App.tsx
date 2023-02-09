import './App.scss';

import { ChangeEvent, FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectUserId, setselectUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [listTodos, setListTodos] = useState<Todo[]>(todos);

  const [hasNameError, setHasNameError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const valideData = `zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTY
  UIOPячсмитьбюЯЧСМИТЬБЮфывапролджэФЫВАПРОЛДЖЭйцукенгшщзхъЙЦУКЕНГШЩЗХёЁ123456789`;

  const resetForm = () => {
    setTitle('');
    setselectUserId(0);
  };

  const selectInput = (event: ChangeEvent<HTMLSelectElement>) => {
    setselectUserId(+event.target.value);
    setHasNameError(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value
      .split('')
      .every(letter => valideData.includes(letter))) {
      setTitle(event.target.value);
      setHasTitleError(false);
    }
  };

  const sendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectUserId && title) {
      const newTodo = {
        id: Math.max(...listTodos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: selectUserId,
        user: getUser(selectUserId),
      };

      setListTodos(current => [...current, newTodo]);

      resetForm();
    }

    setHasNameError(!selectUserId);
    setHasTitleError(!title);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={sendForm}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
          </label>
          {hasTitleError
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectUserId}
              onChange={selectInput}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasNameError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
