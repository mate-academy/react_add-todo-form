import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
} from 'react';
import './App.scss';
import usersFromServer from './api/users';
import { getUser, todos, getTodoNewId } from './helpers/helpers';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const handleClear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    if (title && selectedUserId) {
      const newTodo: Todo = {
        id: getTodoNewId(todos),
        title,
        userId: selectedUserId,
        completed: false,
        user: getUser(selectedUserId),
      };

      setTodoList([...todoList, newTodo]);

      handleClear();
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setUserError(false);
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleChangeTitle}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
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
