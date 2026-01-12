import './App.scss';
import { TodoList } from './components/TodoList';
import React from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';

const todosFromServerWithUser: Todo[] = todosFromServer
  .map(todo => {
    const foundUser = usersFromServer.find(u => u.id === todo.userId);

    if (!foundUser) {
      return null;
    }

    return {
      ...todo,
      user: foundUser,
    };
  })
  .filter((todo): todo is Todo => todo !== null);

export const App = () => {
  const [titleInput, setTitleInput] = React.useState('');
  const [titleInputTouched, setTitleInputTouched] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState('0');
  const [selectUserTouched, setSelectUserTouched] = React.useState(false);
  const [toDos, setToDos] = React.useState(todosFromServerWithUser);
  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();

    const foundUser = usersFromServer.find(u => u.id === Number(selectUser));

    if (titleInput === '' || selectUser === '0' || !foundUser) {
      if (!titleInput) {
        setTitleInputTouched(true);
      }

      if (selectUser === '0') {
        setSelectUserTouched(true);
      }

      return;
    }

    const newObj: Todo = {
      id: Math.max(0, ...toDos.map(toDo => toDo.id)) + 1,
      title: titleInput,
      completed: false,
      userId: Number(selectUser),
      user: foundUser,
    };

    setToDos([...toDos, newObj]);
    setTitleInput('');
    setSelectUser('0');
    setTitleInputTouched(false);
    setSelectUserTouched(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={sendForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={event => setTitleInput(event.target.value)}
          />
          {titleInputTouched && !titleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={event => setSelectUser(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(elem => {
              return (
                <option value={elem.id} key={elem.id}>
                  {elem.name}
                </option>
              );
            })}
          </select>
          {selectUserTouched && selectUser === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList toDos={toDos} />
    </div>
  );
};
