import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import users from './api/users';
import { useState, FormEvent } from 'react';
import { Todo } from './components/services';

export const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelectError, setIsUserSelectError] = useState(false);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsClicked(true);
    setSelectedUserId(Number(event.target.value));
    setIsUserSelectError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(filteredValue);
    setIsTitleEmpty(false);
  };

  const reset = () => {
    setTitle('');
    setIsTitleEmpty(false);
    setSelectedUserId(0);
    setIsClicked(false);
    setIsUserSelectError(false);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId === 0 && title.trim() === '') {
      setIsUserSelectError(true);
      setIsTitleEmpty(true);

      return;
    }

    if (selectedUserId === 0) {
      setIsUserSelectError(true);

      return;
    }

    if (title.trim() === '') {
      setIsTitleEmpty(true);

      return;
    }

    const newTodo: Todo = {
      userId: selectedUserId,
      id: todos.length + 1,
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Write your title"
            onChange={handleInputChange}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleUserSelect}
            value={String(selectedUserId)}
          >
            <option value={0} disabled={isClicked}>
              Choose a user
            </option>

            {users.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {isUserSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
