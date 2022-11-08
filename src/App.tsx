import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const allowedCharacters
  = 'abcdefghijkmnopqrstuvwxyzабвгґдеєжзиіїйклмнопрстуфхцчшщьюя123456789 ';

function isCharacterAllowed(char: string) {
  if (allowedCharacters.includes(char.toLocaleLowerCase())) {
    return true;
  }

  return false;
}

export const App = () => {
  const [toDos, addToDo] = useState([...todosFromServer]);
  const [toDoTitle, setTitle] = useState('');
  const [toDoUser, setUser] = useState('');
  const [isTitleValid, setTitleValidation] = useState(0);
  const [isUserValid, setUserValidation] = useState(0);

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
              value={toDoTitle}
              onChange={(event) => {
                const character = event.target.value.slice(-1);

                if (isCharacterAllowed(character)) {
                  setTitle(event.target.value);
                  setTitleValidation(1);
                }
              }}
            />
          </label>

          {isTitleValid === -1 && (
            <span className="error">Enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={toDoUser}
              onChange={(event) => {
                setUser(event.target.value);
                setUserValidation(1);
              }}
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
          {isUserValid === -1 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event) => {
            event.preventDefault();

            if (!toDoTitle) {
              setTitleValidation(-1);
            }

            if (!toDoUser) {
              setUserValidation(-1);
            }

            if (isTitleValid === 1 && isUserValid === 1) {
              const userId = usersFromServer
                .find(user => user.name === toDoUser)?.id;
              const todoId
                = [...toDos].sort((t1, t2) => t1.id - t2.id)[toDos.length - 1]
                  .id + 1;
              const newTodo = {
                id: todoId,
                title: toDoTitle,
                completed: false,
                userId: userId || 1,
              };

              setTitle('');
              setTitleValidation(0);
              setUser('');
              setUserValidation(0);
              addToDo((prevToDos) => [...prevToDos, newTodo]);
            }
          }}
        >
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={toDos} />
    </div>
  );
};
