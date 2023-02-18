import { useMemo, useState } from 'react';
import { User } from './types/User';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [users] = useState([...usersFromServer]);
  const [todos, setTodos] = useState([...todosFromServer]);
  const [errorObject, setErrorobject] = useState(
    { errorUser: true, errorTitle: true },
  );

  const addElement = (comment: string, userId: number) => {
    const selectUser = users.filter((el: User) => el.id === userId)[0].id;

    setTodos([
      ...todos,
      {
        id: todos.sort((a, b) => b.id - a.id)[0].id + 1,
        title: comment,
        completed: false,
        userId: selectUser,
      }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        setErrorobject({ errorTitle: !!title, errorUser: !!user });

        if (title && user) {
          addElement(title, user);
          setTitle('');
          setUser(0);
        }
      }}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setErrorobject({ ...errorObject, errorTitle: true });
              setTitle(event.target.value);
            }}
          />
          {!errorObject.errorTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event) => {
              setErrorobject({ ...errorObject, errorUser: true });
              setUser(+event.target.value);
            }}
          >
            <option value="0" disabled={user !== 0}>Choose a user</option>
            {usersFromServer.map((el: User, index: number) => {
              return <option value={index + 1} key={el.id}>{el.name}</option>;
            })}
          </select>

          {!errorObject.errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={useMemo(() => {
        return todos.map((todo: Todo) => {
          return {
            ...todo,
            user: users
              .filter((el: User) => el.id === todo.userId)[0],
          };
        });
      }, [user, title])}
      />
    </div>
  );
};
