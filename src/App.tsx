import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';

const findUser = (userId: number) =>
  usersFromServer.find(user => user.id === userId);

const todosWithUsers: Todo[] = todosFromServer.map(todo => {
  const user = findUser(todo.userId);

  return { ...todo, user };
});

const getNewTodoId = (todosArray: Todo[]) => {
  const maxId = Math.max(...todosArray.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState(todosWithUsers);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
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

    const newTodo: Todo = {
      id: getNewTodoId(todosFromServer),
      title: titleValue,
      userId: selectedUserId,
      completed: false,
      user: findUser(selectedUserId),
    };

    setTodos(prevState => [...prevState, newTodo]);
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
            onChange={handleTitleChange}
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

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
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
