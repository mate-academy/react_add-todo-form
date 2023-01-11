import './App.scss';
import { useState } from 'react';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [noTitleError, setNoTitleError] = useState(false);
  const [noUserError, setNoUserError] = useState(false);

  const getId = (taskList: { id: number }[]) => (
    (Math.max(...taskList.map(task => task.id)) + 1)
  );

  const handleChangeTitle = (newValue: string) => {
    setTitle(newValue);
    setNoTitleError(false);
  };

  const handleChangeUser = (newValue: number) => {
    setUserId(newValue);
    setNoUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setNoTitleError(!title);
      setNoUserError(!userId);

      return;
    }

    if (!userId) {
      setNoUserError(true);

      return;
    }

    setTodoList(prevList => {
      const newTask = {
        id: getId(prevList),
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      return ([...todoList, newTask]);
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => handleChangeTitle(event.target.value)}
            />
          </label>

          {noTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => handleChangeUser(+event.target.value)}
            >
              <option value={0}>Choose a user</option>

              {usersFromServer.map(person => (
                <option value={person.id} key={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          {noUserError && (
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
