import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './services/user';
import { Todo } from './services/todo';
import { useState } from 'react';

export const App = () => {
  const users: User[] = [...usersFromServer];
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer
      .map(t => {
        const user = users.find(u => u.id === t.userId);

        if (!user) {
          return null;
        }

        return { ...t, user } as Todo;
      })
      .filter((t): t is Todo => t !== null),
  );

  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState('0');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const titleInvalid = !title;
  const userInvalid = selectUser === '0';

  const getNextId = (arr: Todo[]) => {
    if (arr.length === 0) {
      return 1;
    }

    return Math.max(...arr.map(t => t.id)) + 1;
  };

  // const selectedUser = users.find(u => u.id === Number(selectUser));

  // const todosWithUsers = todos.filter(todo =>
  //   users.some(u => u.id === todo.userId),
  // );

  // const findUserById = (usersArr: User[], id: number): User | undefined => {
  //   return usersArr.find(user => user.id === id);
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(titleInvalid);
    setHasSelectError(userInvalid);

    if (titleInvalid || userInvalid) {
      return;
    }

    const selectedUser = users.find(u => u.id === Number(selectUser));

    if (!selectedUser) {
      setHasSelectError(true);

      return;
    }

    const newTodo: Todo = {
      id: getNextId(todos),
      title: title.trim(),
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            Title
            <br />
            <input
              id="titleInput"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            Select user
            <br />
            <select
              data-cy="userSelect"
              id="userSelect"
              value={selectUser}
              onChange={event => {
                setSelectUser(event.target.value);
                setHasSelectError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

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
