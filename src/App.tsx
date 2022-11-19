import { ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodo] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setUser] = useState('');
  const [isTitleValid, setTitleValidation] = useState(true);
  const [isUserValid, setUserValidation] = useState(true);

  const allowedCharacters = /[aA-zZ]|[аА-яЯ]|\s/;

  function addCharacter(event: ChangeEvent<HTMLInputElement>) {
    const char = event.target.value.slice(-1);

    if (char.match(allowedCharacters)) {
      setTitle(event.target.value);
      setTitleValidation(true);
    }
  }

  function selectUser(event: ChangeEvent<HTMLSelectElement>) {
    setUser(event.target.value);
    setUserValidation(true);
  }

  function addTodo(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();

    if (title === '' || selectedUser === '') {
      if (!title) {
        setTitleValidation(false);
      }

      if (!selectedUser) {
        setUserValidation(false);
      }

      return;
    }

    if (isTitleValid && isUserValid) {
      const userId = usersFromServer
        .find(u => u.name === selectedUser)?.id;

      if (userId) {
        const todoId
          = [...todos].sort((t1, t2) => t1.id - t2.id)[todos.length - 1]
            .id + 1;
        const newTodo = {
          id: todoId,
          title,
          completed: false,
          userId,
        };

        setTitle('');
        setTitleValidation(true);
        setUser('');
        setUserValidation(true);
        setTodo((prevToDos) => [...prevToDos, newTodo]);
      }
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div
          className="field"
        >
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={(event) => addCharacter(event)}
            />
          </label>

          {!isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => selectUser(event)}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isUserValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event) => addTodo(event)}
        >
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
