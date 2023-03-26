import './App.scss';
import './assets/fonts/Cyberpunk/Cyberpunk.ttf';
import './assets/fonts/BlenderProBook/BlenderProBook.otf';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (id: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
};

export const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isUserError, setIsUserError] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setIsTitleError(false);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.currentTarget.value);
    setIsUserError(false);
  };

  const selectedUser = userId !== 0;
  const emptyTitle = !title.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      setIsUserError(true);
    }

    if (emptyTitle) {
      setIsTitleError(true);
    }

    if (selectedUser && !emptyTitle) {
      const newTodo = {
        title,
        completed: false,
        userId,
        user: getUser(userId),
        id: getId(todos),
      };

      setTodos(prevState => [...prevState, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="app">
      <div className="app__wrapper">
        <h1 className="app__title">Add todo form</h1>

        <form
          className="form"
          onSubmit={handleSubmit}
          action="/api/users"
          method="POST"
        >
          <div className="form__field-wrapper">
            <div className="form__field">
              <label className="form__label">
                <p className="form__title">Title</p>
                <input
                  className="form__input"
                  type="text"
                  data-cy="titleInput"
                  placeholder="Title"
                  value={title}
                  onChange={handleChangeTitle}
                />
                {isTitleError
                  && <span className="error">Please enter a title</span>}
              </label>

              <label className="form__label">
                <p className="form__title">User</p>
                <select
                  className="form__select"
                  value={userId}
                  data-cy="userSelect"
                  onChange={handleChangeUser}
                >
                  <option value={0} disabled>Choose a user</option>

                  {usersFromServer.map(({
                    id,
                    name,
                  }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
                {isUserError
                  && <span className="error">Please choose a user</span>}
              </label>
            </div>
          </div>

          <button
            className="form__button"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>
      </div>

      <TodoList todos={todos} />
    </div>
  );
};
