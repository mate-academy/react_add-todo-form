import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todos';

export const App = () => {
  const initial = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(initial);

  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState('');
  const [userIdErrorMessage, setUserIdErrorMessage] = useState('');

  const addNewUser = (newUser: Todo) => {
    setTodos(currentUsers => [...currentUsers, newUser]);
  };

  const henldeTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage('');
  };

  const hendleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserIdErrorMessage('');
  };

  const reset = () => {
    setTitle('');
    setTitleErrorMessage('');
    setUserId('');
    setUserIdErrorMessage('');
  };

  const hendleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!userId) {
      setUserIdErrorMessage('Please choose a user');
    }

    if (!title.trim() || !userId) {
      return;
    }

    addNewUser({
      title: title.trim(),
      userId: +userId,
      completed: false,
      id: (Math.max(...todos.map(t => t.id)) || 0) + 1,
      user: usersFromServer.find(user => user.id === +userId) || undefined,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={hendleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">
            {' '}
            Title:{' '}
            <input
              id="todo-title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={henldeTitleChange}
              placeholder="Enter a title"
            />
            {titleErrorMessage && (
              <span className="error">{titleErrorMessage}</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="todo-userId">
            {' '}
            User:{' '}
            <select
              id="todo-userId"
              data-cy="userSelect"
              value={userId}
              onChange={hendleSelectChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userIdErrorMessage && (
              <span className="error">{userIdErrorMessage}</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
