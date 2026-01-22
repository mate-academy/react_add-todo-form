import React, { useState, FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App = () => {
  // FIX 1: Безпечне створення initialTodos
  // Ми спочатку мапимо, а потім фільтруємо ті, де юзера не знайдено.
  // Таким чином TypeScript знає, що в фінальному масиві user точно є.
  const initialTodos: Todo[] = todosFromServer
    .map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return {
        ...todo,
        user, // Тут тип User | undefined
      };
    })
    // Залишаємо тільки ті тудушки, де є юзер
    .filter((todo): todo is Todo => !!todo.user);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserNotSelected = userId === 0;

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    // Додаткова перевірка безпеки
    if (!selectedUser) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: selectedUser, // Тут ми впевнені, що юзер є
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {/* FIX 2: Додали label і id */}
          <label htmlFor="titleInput" className="label">
            Title
          </label>

          <div className="control">
            <input
              type="text"
              id="titleInput" // Зв'язуємо з label
              data-cy="titleInput"
              placeholder="Todo title"
              value={title}
              onChange={handleTitleChange}
              className={classNames('input', { 'is-danger': hasTitleError })}
            />
          </div>
          {hasTitleError && (
            <span className="help is-danger">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {/* FIX 2: Додали label і id */}
          <label htmlFor="userSelect" className="label">
            User
          </label>

          <div className="control">
            <div className="select">
              <select
                id="userSelect" // Зв'язуємо з label
                data-cy="userSelect"
                value={userId}
                onChange={handleUserChange}
                className={classNames({ 'is-danger': hasUserError })}
              >
                <option value="0" disabled>
                  Choose a user
                </option>
                {usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {hasUserError && (
            <span className="help is-danger">Please choose a user</span>
          )}
        </div>

        <div className="control">
          <button
            type="submit"
            className="button is-primary"
            data-cy="submitButton"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
