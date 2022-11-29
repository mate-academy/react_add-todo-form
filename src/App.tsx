import React, { useState } from 'react';

import './App.scss';

import { Todo } from './type/Todo';
import { User } from './type/User';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const findUser = usersFromServer.find(
    user => user.id === userId,
  );

  return findUser || null;
}

const todos: Todo[] = todosFromServer.map(
  todo => ({
    ...todo,
    user: getUser(todo.userId) || null,
  }),
);

export const App: React.FC = () => {
  const [text, setText] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [correctList, setCorrectList] = useState([...todos]);
  const [errorText, setErrorText] = useState(true);
  const [errorTargetUser, setErrorTargetUser] = useState(true);

  const titleFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);

    if (text.trim() !== ' ') {
      setErrorText(true);
    }
  };

  const selectFunc = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetUser(event.target.value);

    if (targetUser !== ' ') {
      setErrorTargetUser(true);
    }
  };

  function submitForm(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (text.trim() === '' && targetUser === '') {
      setErrorText(false);
      setErrorTargetUser(false);

      return;
    }

    if (targetUser === '') {
      setErrorTargetUser(false);

      if (text.trim() !== '') {
        setErrorText(true);
      }

      return;
    }

    if (text.trim() === '') {
      setErrorText(false);

      if (targetUser !== '') {
        setErrorTargetUser(true);
      }

      return;
    }

    function maxId(arr: Todo[]): number {
      let newId = 0;

      arr.forEach((element: Todo) => {
        if (element.id > newId) {
          newId = element.id + 1;
        }
      });

      return newId;
    }

    const newTodo: Todo = {
      id: maxId(correctList),
      title: text,
      completed: false,
      userId: +targetUser,
      user: getUser(+targetUser),
    };

    setCorrectList((state) => {
      const copy = [...state];

      copy.push(newTodo);

      return copy;
    });
    setText('');
    setTargetUser('');
    setErrorText(true);
    setErrorTargetUser(true);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={text}
            onChange={titleFunc}
          />
          {(!errorText)
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={targetUser}
            onChange={selectFunc}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {(!errorTargetUser)
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={correctList} />
    </div>
  );
};
