import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

type Togo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Data =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [todos, setTodos] = useState<Togo[]>(todosFromServer);

  const [userHasError, setUserHasError] = useState(false);
  const [titleHasError, setTitleHasError] = useState(false);

  const handleChange = (e: Data) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
      setTitleHasError(false);
    } else {
      setUserId(Number(e.target.value));
      setUserHasError(false);
    }
  };

  const checkTitle = () => {
    return title.trim().length > 0;
  };

  function getNewId() {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  const addTodo = () => {
    const user = usersFromServer.find(person => person.id === userId);

    const id = user?.id || 0;

    const newTodo: Togo = {
      id: getNewId(),
      title: title.trim(),
      userId: id,
      completed: false,
    };

    setTodos(currentTogos => {
      return [...currentTogos, newTodo];
    });
  };

  const resset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSambit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!checkTitle() && !userId) {
      setUserHasError(true);
      setTitleHasError(true);
      hasError = true;
    }

    if (!checkTitle()) {
      setTitleHasError(true);
      hasError = true;
    }

    if (!userId) {
      setUserHasError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    addTodo();

    resset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSambit}>
        <div className="field">
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Write here you text UA / EN"
            onChange={e => handleChange(e)}
          />
          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={e => handleChange(e)}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userHasError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
