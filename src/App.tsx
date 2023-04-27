import { ChangeEvent, FormEvent, useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

const getUserById = (id: number): User | null => {
  const foundedUser = usersFromServer.find(user => user.id === id);

  return foundedUser || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (visibleTodos: Todo[]) => {
  const todosId = [...visibleTodos].map(el => el.id);

  return Math.max(...todosId);
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);

  const [visibleTodos, setVisibleTodos] = useState(todosWithUsers);

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+event.target.value);
    setIsUserSelected(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    if (!currentUserId) {
      setIsUserSelected(true);
    }

    if (!trimedTitle) {
      setIsTitleEmpty(true);
    }

    if (trimedTitle && currentUserId) {
      const newTodoId = getNewTodoId(visibleTodos);
      const user = getUserById(currentUserId);

      setVisibleTodos((prevVisibleTodos) => {
        const newTodo = {
          id: newTodoId + 1,
          title,
          userId: currentUserId,
          completed: false,
          user,
        };

        return [...prevVisibleTodos, newTodo];
      });

      setTitle('');
      setCurrentUserId(0);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={currentUserId}
            onChange={handleUser}
          >
            <option value={0} disabled>Choose a user</option>

            {usersFromServer.map(userFromServer => {
              const { name, id } = userFromServer;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
