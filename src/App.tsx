import './App.scss';
import { useState, useEffect } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [inputText, setInputText] = useState('');
  const [id, setId] = useState(0);
  const [allTodos, setAllTodos] = useState(todosFromServer);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isVisibleTitle, setIsVisibleTitle] = useState(false);

  useEffect(() => {
    if (id) {
      setIsVisibleUser(false);
    }

    if (inputText.trim()) {
      setIsVisibleTitle(false);
    }
  }, [id, inputText]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setIsVisibleUser(true);
    } else {
      setIsVisibleUser(false);
    }

    if (!inputText.trim()) {
      setIsVisibleTitle(true);
    } else {
      setIsVisibleTitle(false);
    }

    if (id && inputText.trim()) {
      const newTodo = {
        id: allTodos.length,
        title: inputText,
        completed: false,
        userId: id,
      };

      setAllTodos(prev => [...prev, newTodo]);

      setId(0);
      setInputText('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={inputText}
            onChange={event => setInputText(event.currentTarget.value)}
          />
          <span
            className="error"
            style={{ display: isVisibleTitle ? 'block' : 'none' }}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={id}
            onChange={event => {
              setId(+event.currentTarget.value);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span
            className="error"
            style={{ display: isVisibleUser ? 'block' : 'none' }}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} users={usersFromServer} />
      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
