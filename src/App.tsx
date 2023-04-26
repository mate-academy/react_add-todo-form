import './App.scss';
import { ChangeEvent, FC, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(id: number):User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [visibleTodos, setTodos] = useState(todos);
  const [isSelectedUserError, setSelectionError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handlerTitleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9\s]/g, '',
    );

    if (formattedTitle) {
      setTitle(formattedTitle);
      setTitleError(false);
    }
  };

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setSelectionError(true);
    }

    if (!title || !userId) {
      return;
    }

    const biggerId = Math.max(...todosFromServer.map(todo => todo.id));
    const exactlyUser = getUserById(userId);

    const newTodo: Todo = {
      id: biggerId + 1,
      title,
      completed: false,
      userId: exactlyUser?.id,
      user: exactlyUser,
    };

    setTodos([...visibleTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleSelectionChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    if (value) {
      setUserId(Number(value));
      setSelectionError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label htmlFor="title-input">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              id="title-input"
              value={title}
              onChange={handlerTitleChange}
            />
          </label>

          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelection">
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              id="userSelection"
              onChange={handleSelectionChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(({ id, name }) => {
                return (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {isSelectedUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
