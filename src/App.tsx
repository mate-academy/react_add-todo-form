import { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setNewTitle] = useState('');
  const [user, setUser] = useState('0');
  const [warningTitle, setWarningTitle] = useState(false);
  const [warningUser, setWarningUser] = useState(false);

  const getNewId = () => {
    let largestId = 0;

    for (let i = 0; i < todoList.length; i++) {
      if (largestId < todoList[i].id) {
        largestId = todoList[i].id;
      }
    }

    return largestId + 1;
  };

  const submitHandler: FormEventHandler = event => {
    event.preventDefault();

    if (title === '' || user === '0') {
      if (title === '') {
        setWarningTitle(true);
      }

      if (user === '0') {
        setWarningUser(true);
      }
    } else {
      setTodoList([
        ...todoList,
        {
          id: getNewId(),
          title: title,
          completed: false,
          userId: +user,
          user: getUser(+user),
        },
      ]);
      setNewTitle('');
      setUser('0');
    }
  };

  const getNewTitle: React.ChangeEventHandler<HTMLInputElement> = event => {
    setWarningTitle(false);
    setNewTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={getNewTitle}
            placeholder="Enter a title"
          />
          {warningTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setWarningUser(false);
              setUser(event.target.value);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {warningUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todoList} />

        {/* <article data-id="1" className="TodoInfo TodoInfo--completed">
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
        </article> */}
      </section>
    </div>
  );
};
