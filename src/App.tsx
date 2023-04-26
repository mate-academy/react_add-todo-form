import './App.scss';

import { ChangeEvent, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todosList, setTodosList] = useState<Todo[]>(todos);
  const [titleError, setTitleError] = useState('');
  const [errorUserSelect, setErrorUserSelect] = useState('');

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setErrorUserSelect('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setTitleError('Please enter a title');
    }

    if (selectedUser === 0) {
      setErrorUserSelect('Please choose a user');
    }

    if (title && selectedUser) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        userId: selectedUser,
        title,
        completed: false,
        user: getUser(selectedUser),
      };

      setTodosList((currentList) => [
        ...currentList,
        newTodo,
      ]);

      setTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUserSelect && <span className="error">{errorUserSelect}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
