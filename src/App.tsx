import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUserbyId = (userId: number): User | undefined => {
  return usersFromServer.find((user) => user.id === userId);
};

const todosWithUsers = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUserbyId(todo.userId),
  }
));

const getNewId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todoList, setTodoList] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      const newTodo = {
        id: getNewId(todoList),
        title,
        completed: false,
        userId,
        user: getUserbyId(userId),
      };

      setTodoList([...todoList, newTodo]);
      setTitle('');
      setUserId(0);
      setShowError(false);
    } else {
      setShowError(true);
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
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(event) => {
                const { value } = event.target;

                setTitle(value);
              }}
            />
          </label>

          {showError
              && !title
              && (
                <span className="error">
                  Please enter a title
                </span>
              )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                const { value } = event.target;

                setUserId(+value);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => {
                const { id, name } = user;

                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {showError
              && !userId
              && (
                <span className="error">
                  Please choose a user
                </span>
              )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};

export const App2 = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>Choose a user</option>
          </select>

          <span className="error">Please choose a user</span>
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
    </div>
  );
};
