import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useRef, useState } from 'react';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [userId, setUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);

  const getUserById = (id: number): User => {
    const userFromServer = usersFromServer.find(u => u.id === id);

    return userFromServer!;
  };

  const removeSpecialChars = (text: string) => {
    const allowedCharsRegex = /[^a-zA-Zа-яА-ЯҐґЄєІіЇї0-9 ]/g;

    return text.replaceAll(allowedCharsRegex, '');
  };

  const getNextId = (): number => Math.max(...todos.map(todo => todo.id)) + 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!user) {
      setUserErrorMessage('Please choose a user');
    }

    if (title && user) {
      const todoToSave: Todo = {
        id: getNextId(),
        title,
        completed: false,
        userId: user.id,
        user,
      };

      setTodos([...todos, todoToSave]);
      setTitle('');
      setUser(null);
      setUserId('0');
      titleRef.current?.focus();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = removeSpecialChars(event.target.value);

    setTitle(cleanedTitle);
    setTitleErrorMessage('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserErrorMessage('');
    const id = event.target.value;

    setUserId(id);

    const selectedUser = getUserById(+id);

    if (selectedUser) {
      setUser(selectedUser);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            value={title}
            ref={titleRef}
            onChange={handleTitleChange}
          />
          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {userErrorMessage && (
            <span className="error">{userErrorMessage}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList
          todos={todos.map(todo => ({
            ...todo,
            user: getUserById(todo.userId),
          }))}
        />
      </form>
    </div>
  );
};
