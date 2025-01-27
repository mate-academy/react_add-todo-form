import React, { FormEventHandler, useEffect, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (user === '') {
      setUserError('Please choose a user');
    } else {
      setUserError('');
    }

    if (title === '') {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }
  }, [userError, titleError, user, title]);

  const getUserByName = (name: string): User | null => {
    const foundUser = usersFromServer.find(users => users.name === name);

    return foundUser || null;
  };

  const findHighestId = todos.reduce(
    (max, users) => (users.id > max ? users.id : max),
    todos[0].id,
  );

  const handleSumbit: FormEventHandler = event => {
    event.preventDefault();

    if (titleError !== '' || userError !== '') {
      return;
    }

    todos.push({
      title: title,
      user: getUserByName(user),
      userId: getUserByName(user)?.id,
      completed: false,
      id: findHighestId + 1,
    });

    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form onSubmit={handleSumbit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          {titleError !== '' && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={user}
            onChange={event => {
              setUser(event.target.value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(users => {
              return (
                <option key={users.id} value={users.name}>
                  {users.name}
                </option>
              );
            })}
          </select>
          {userError !== '' && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
// export const App: React.FC = () => {
//   return (
//     <div className="App">
//       <h1>Add todo form</h1>

// <form action="/api/todos" method="POST">
//   <div className="field">
//     <input type="text" data-cy="titleInput" />
//     <span className="error">Please enter a title</span>
//   </div>

//   <div className="field">
//     <select data-cy="userSelect">
//       <option value="0" disabled>
//         Choose a user
//       </option>
//     </select>

//     <span className="error">Please choose a user</span>
//   </div>

//   <button type="submit" data-cy="submitButton">
//     Add
//   </button>
// </form>

//       <section className="TodoList">
//         <article data-id="1" className="TodoInfo TodoInfo--completed">
//           <h2 className="TodoInfo__title">delectus aut autem</h2>

//           <a className="UserInfo" href="mailto:Sincere@april.biz">
//             Leanne Graham
//           </a>
//         </article>

//         <article data-id="15" className="TodoInfo TodoInfo--completed">
//           <h2 className="TodoInfo__title">delectus aut autem</h2>

//           <a className="UserInfo" href="mailto:Sincere@april.biz">
//             Leanne Graham
//           </a>
//         </article>

//         <article data-id="2" className="TodoInfo">
//           <h2 className="TodoInfo__title">
//             quis ut nam facilis et officia qui
//           </h2>

//           <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
//             Patricia Lebsack
//           </a>
//         </article>
//       </section>
//     </div>
//   );
// };
