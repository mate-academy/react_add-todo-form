import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [noteText, setNoteText] = useState<string>('');
  const [noteUser, setNoteUser] = useState<string>('0');
  const [touched, setTouched] = useState({ title: false, user: false }); // track interactions with input fields

  const findUserById = (id: string | number): User | undefined => {
    return users.find(user => String(user.id) === String(id));
  };

  const getNextId = () =>
    todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');

    setNoteText(value);
    setTouched(t => ({ ...t, title: true }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoteUser(e.target.value);
    setTouched(t => ({ ...t, user: true }));
  };

  const isTitleValid = noteText.trim() !== '';
  const isUserValid = noteUser !== '0';

  const isFormValid = isTitleValid && isUserValid;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ title: true, user: true });

    if (!isFormValid) {
      return;
    }

    const userInfo = findUserById(noteUser);

    if (!userInfo) {
      return;
    }

    const newTodo: Todo & { user: User } = {
      id: getNextId(),
      title: noteText.trim(),
      completed: false,
      userId: userInfo.id,
      user: userInfo, // embed the user object here
    };

    setTodos([...todos, newTodo]);
    setNoteText('');
    setNoteUser('0');
    setTouched({ title: false, user: false });
  }

  const todosWithUsers: (Todo & { user: User })[] = todos.map(todo => {
    const user = users.find(u => u.id === todo.userId);

    if (!user) {
      throw new Error(`User not found for todoId: ${todo.id}`);
    }

    return {
      ...todo,
      user,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter note text"
            value={noteText}
            onChange={handleTextChange}
            data-cy="titleInput"
          />
          {touched.title && !isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={noteUser}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {touched.user && !isUserValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList todos={todosWithUsers} />
      </form>
    </div>
  );
};
