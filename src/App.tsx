import { FC, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './api/todos';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [titileValue, setTitleValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleAdd = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setIsClicked(true);

    if (!titileValue.trim() || selectedUser === 0) {
      return;
    }

    let newToDoId = 0;

    todos.forEach((todo: Todo): void => {
      if (todo.id > newToDoId) {
        newToDoId = todo.id;
      }
    });

    const newToDo: Todo = {
      id: newToDoId + 1,
      title: titileValue,
      completed: false,
      userId: selectedUser,
    };

    setTodos([...todos, newToDo]);
    setTitleValue('');
    setSelectedUser(0);
    setIsClicked(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedUser(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAdd}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titileValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setTitleValue(event.target.value);
            }}
          />
          {!titileValue && isClicked && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelect}
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

          {selectedUser === 0 && isClicked && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
