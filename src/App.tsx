import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';

export const App = () => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const todosWithUsers: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(usr => usr.id === todo.userId);

    return { ...todo, user };
  });

  const [todos, setTodos] = useState(todosWithUsers);

  const getNewTodoId = (todosArray: Todo[]) => {
    const maxId = Math.max(...todosArray.map(todo => todo.id));

    return maxId + 1;
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleAddNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    let titleHasError = false;
    let userHasError = false;

    if (!titleValue) {
      setHasTitleError(true);
      titleHasError = true;
    }

    if (!selectedUserId) {
      setHasUserError(true);
      userHasError = true;
    }

    if (titleHasError || userHasError) {
      return;
    }

    const id = getNewTodoId(todosFromServer);
    const title = titleValue;
    const userId = selectedUserId;
    const completed = false;
    const user = usersFromServer.find(usr => usr.id === userId);

    const todo: Todo = { id, title, userId, completed, user };

    setTodos([...todosWithUsers, todo]);
    setTitleValue('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddNewTodo}>
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={handleTitleInput}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={selectedUserId}
          >
            <option value="0" key={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(usr => (
              <option value={usr.id} key={usr.id}>
                {usr.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
