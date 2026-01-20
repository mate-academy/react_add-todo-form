import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    }));
  });

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');

  const handleTitleChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, '');

    setTitle(filtered);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (value: number) => {
    setUserId(value);

    if (userIdError) {
      setUserIdError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid: boolean = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (userId === 0) {
      setUserIdError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const user = usersFromServer.find(person => person.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: user,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserChange(+event.target.value)}
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

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
