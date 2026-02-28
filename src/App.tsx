import React, { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const u = usersFromServer.find(
          u => u.id === todo.userId,
        );

        if (!u) {
          return null; // пропускаємо todo без користувача
        }

        return {
          ...todo,
          user: u,
        };
      })
      .filter((todo): todo is Todo => todo !== null),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const maxId =
      todos.length > 0
        ? Math.max(...todos.map(todo => todo.id))
        : 0;

    const newId = maxId + 1;

    const user = usersFromServer.find(
      u => u.id === Number(userId),
    );

    if (!user) {
      setUserError('Please choose a valid user');
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId('');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
