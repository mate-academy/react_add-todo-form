import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  const foundUser = usersFromServer.find((user: User) => (
    user.id === userId
  ));

  return foundUser || null;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [id, setId] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsTitle(false);
    setTitle(value);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setIsUser(false);
    setUserId(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (userId === 0) {
      setIsUser(true);
    }

    if (title === '') {
      setIsTitle(true);
    }

    if (title === '' || userId === 0) {
      return;
    }

    setId(() => id + 1);

    setTodos(() => {
      return [...todos, {
        id,
        title,
        completed: false,
        userId,
        user: getUserById(Number(userId)),
      }];
    });

    if (title !== '' && userId !== 0) {
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />
          <span className="error">
            {(isTitle) && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleChangeSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">
            {(isUser) && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

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
      </section>

      <TodoList todos={todos} />
    </div>
  );
};
