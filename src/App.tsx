import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo, TodoForRender } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const localUsers: User[] = usersFromServer.map(user => ({ ...user }));
let localTodos: Todo[] = todosFromServer.map(todo => ({ ...todo }));

function prepareTodos(): TodoForRender[] {
  return (
    localTodos.map(todo => {
      return ({
        ...todo,
        user: localUsers.find(user => user.id === todo.userId) || null,
      });
    })
  );
}

export const App = () => {
  const [todosToRender, setTodosToRender] = useState(prepareTodos());
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errTitle, setErrTitle] = useState(false);
  const [errUser, setErrUser] = useState(false);

  const todoCreator = () => {
    const maxId = todosToRender.reduce((max, { id }) => {
      return (max < id) ? id : max;
    }, 0);

    const newTodo: Todo = {
      id: (maxId + 1),
      title: newTitle,
      completed: false,
      userId: +selectedUserId,
    };

    localTodos = localTodos.map(todo => ({ ...todo }));
    localTodos.push(newTodo);

    setTodosToRender(prepareTodos());
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
      todoCreator();
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
              placeholder='Enter a title'
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

              {localUsers.map(person => (
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
