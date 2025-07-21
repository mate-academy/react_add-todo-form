import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todos, setTodo] = useState(todosFromServer);

  const [titlee, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selecteedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedError, setHasSelectedError] = useState(false);

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  type AddPostsParams = {
    title: string;
    selectedUserId: number;
  };

  const addPosts = ({ title, selectedUserId }: AddPostsParams) => {
    const userExists = usersFromServer.some(user => user.id === selectedUserId);

    if (!userExists) {


      return;
    }

    const arr = [...todos];
    const maxId = arr.length > 0 ? Math.max(...arr.map(todo => todo.id)) : 0;

    const prepared = {
      id: maxId + 1,
      title,
      userId: selectedUserId,
      completed: false,
    };

    const newTodos = [...arr, prepared];

    reset();
    setTodo(newTodos);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!titlee);
    setHasSelectedError(!selecteedUserId);

    if (!titlee || !selecteedUserId) {
      return;
    }

    addPosts({ title: titlee, selectedUserId: selecteedUserId });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="#" method="POST" onSubmit={handleSubmit} onReset={reset}>
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              onChange={event => {
                setTitle(event.target.value);
                setHasTitleError(false);
              }}
              value={titlee}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selecteedUserId}
              onChange={e => {
                setSelectedUserId(Number(e.target.value));
                setHasSelectedError(false);
              }}
            >
              <option value="0">Choose a user</option>

              {usersFromServer.map(e => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {hasSelectedError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
