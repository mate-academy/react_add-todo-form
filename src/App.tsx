import React from 'react';
import './App.scss';
import { User } from './types/User';
// import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

// export const todosWithUser: Todo[] = todosFromServer.map(todo => ({
//   ...todo,
//   user: getUser(todo.userId),
// }));

export const todosWithUser = () => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));
};

export const App = () => {
  const [todos, setTodos] = React.useState(todosWithUser);
  const [title, setTitle] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState(0);
  const [addError, setAddError] = React.useState(false);

  const handleAddTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (title && selectedUser) {
      const user = getUser(selectedUser);
      const allTodoIds = todos.map(todo => todo.id);
      const maxID = Math.max(...allTodoIds);

      if (user) {
        const newTodo = {
          id: maxID + 1,
          userId: user.id,
          title,
          completed: false,
        };

        todosFromServer.push(newTodo);
      }

      setTodos(todosWithUser);
      setTitle('');
      setSelectedUser(0);
      setAddError(false);
    } else {
      setAddError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleAddTodo(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => setTitle(() => {
              return event.target.value.replace(/[^a-z0-9 ]/gi, '');
            })}
          />

          {addError && !title && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(+event.target.value)}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {addError && !selectedUser && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          // onSubmit={(event) => handleAddTodo(event)}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
      {/* <section className="TodoList">
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
      </section> */}
    </div>
  );
};
