import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo, TodoForRender } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialData = (): TodoForRender[] => {
  return (
    todosFromServer.map((todo: Todo) => {
      return ({
        ...todo,
        user: usersFromServer
          .find((user: User) => user.id === todo.userId) || null,
      });
    })
  );
};

export const App = () => {
  const [todosToRender, setTodosToRender] = useState(initialData);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errTitle, setErrTitle] = useState(false);
  const [errUser, setErrUser] = useState(false);

  const todoUpdater = () => {
    const maxId = todosToRender.reduce((max, { id }) => {
      return (max < id) ? id : max;
    }, 0);

    const newTodo: TodoForRender = {
      id: (maxId + 1),
      title: newTitle,
      completed: false,
      userId: +selectedUserId,
      user: usersFromServer
        .find((user: User) => user.id === +selectedUserId) || null,
    };

    const updatedTodos = todosToRender.map(todo => ({ ...todo }));

    updatedTodos.push(newTodo);

    setTodosToRender(updatedTodos);
    setNewTitle('');
    setSelectedUserId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      setErrTitle(true);
    }

    if (!selectedUserId) {
      setErrUser(true);
    }

    if (selectedUserId && newTitle) {
      todoUpdater();
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.target.value);
                setErrTitle(false);
              }}
            />

            {errTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(event.target.value);
                setErrUser(false);
              }}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(person => (
                <option
                  value={person.id}
                  key={person.id}
                >
                  {person.name}
                </option>
              ))}
            </select>

            {errUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosToRender} />
    </div>
  );
};
