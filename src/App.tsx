import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

function searchUserById(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: searchUserById(todo.userId) as User,
}));


export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [text, setText] = useState('');
  const [hasErrorText, setHasErrorText] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(initialTodos);

  const isFormValid = () => {
    let valid = true;

    if (selectedUser === 0) {
      setHasErrorUser(true);
      valid = false;
    }

    if (text.trim().length === 0) {
      setHasErrorText(true);
      valid = false;
    }

    return valid;
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const user = searchUserById(selectedUser);

    if (!user) {
      return;
    }

    const newId = Math.max(...newTodos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: newId,
      title: text,
      userId: selectedUser,
      user,
      completed: false,
    };

    setNewTodos([...newTodos, newTodo]);

    setSelectedUser(0);
    setText('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
        noValidate
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={text}
            placeholder="Enter a title"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
              setHasErrorText(false);
            }}
          />

          {hasErrorText ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedId = Number(event.target.value);

              setSelectedUser(selectedId);
              setHasErrorUser(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasErrorUser ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
