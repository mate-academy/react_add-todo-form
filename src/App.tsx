import './App.scss';
import { useState } from 'react';
import { Todo } from './react-app-env';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [todosToShow, setTodosToShow] = useState<Todo[]>(todosFromServer);

  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [hasTitleErr, setHasTitleErr] = useState(false);
  const [hasUserErr, setHasUserErr] = useState(false);

  const clearForm = () => {
    setSelectedUserId(0);
    setTodoTitle('');
  };

  const createIdForTodo = () => {
    let max = 0;

    todosToShow.forEach(todo => {
      if (todo.id > max) {
        max = todo.id;
      }
    });

    return max + 1;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: createIdForTodo(),
      title: todoTitle,
      completed: false,
      userId: selectedUserId,
    };

    if (!todoTitle) {
      setHasTitleErr(true);
    }

    if (!selectedUserId) {
      setHasUserErr(true);
    }

    if (todoTitle && selectedUserId) {
      setTodosToShow(currTodos => ([...currTodos, newTodo]));
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            id="todoTitle"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
              setHasTitleErr(false);
            }}
          />

          {hasTitleErr
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelector">User: </label>
          <select
            id="userSelector"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setHasUserErr(false);
            }}
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

          {hasUserErr
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosToShow} />
    </div>
  );
};
