import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

const getUser = (userId: number) => {
  const foundedUser = usersFromServer.find(user => (
    userId === user.id
  ));

  return foundedUser || null;
};

const todosWithUser: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUser(todo.userId),
  }
));

const newId = (todos: Todo[]) => {
  const maxId = (todos.map((todo) => (todo.id)));

  return Math.max(...maxId) + 1;
};

export const App = () => {
  const [user, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([...todosWithUser]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (title !== '' && user !== 0) {
      const newTodo: Todo = {
        id: newId(todos),
        userId: user,
        title,
        completed: false,
        user: getUser(user),
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => (handleSubmit(event))}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => (handleTitleSelect(event))}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event) => (handleUserSelect(event))}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(userFromServer => (
              userFromServer && (
                <option key={userFromServer.id} value={userFromServer.id}>
                  {userFromServer.name}
                </option>
              )))}

          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
