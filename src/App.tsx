import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState, FormEvent, FC } from 'react';
import { Todo } from './types/Todo';

enum DefaultField {
  title = 'Enter a title',
  select = 'Choose a user',
}

const preparedData = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedData);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setErrorTitle(!title.trim());
    setErrorUser(!userId);

    const formattedTitle = title.trim();

    if (formattedTitle.length === 0 || !userId) {
      return;
    }

    const ids = todos.map(({ id }) => id);
    const id = Math.max(...ids, 0) + 1;

    // const user = usersFromServer.find(someUser => someUser.id === userId);

    // if (!user) {
    //   setErrorUser(true);

    //   return;
    // }

    const newTodo: Todo = {
      id,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId),
    };

    setTodos(prev => [...prev, newTodo]);
    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            placeholder={DefaultField.title}
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>
              {DefaultField.select}
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos.filter(todo => todo.user !== undefined)} />
    </div>
  );
};
