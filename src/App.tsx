import { useState } from 'react';
import './App.scss';
import { User } from './components/UserInfo';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}

export const App = () => {
  const users = [...usersFromServer] as User[];

  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: users.find(u => u.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.target.value.replace(
      /[^a-zA-Zа-яіїєґА-ЯІЇЄҐ0-9 ]/g,
      '',
    );

    setTitle(cleanedValue);
    setTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = selectedUserId === 0;

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const selectedUser = users.find(u => u.id === selectedUserId)!;

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const nextId = maxId + 1;

    const newToDo: Todo = {
      id: nextId,
      userId: selectedUserId,
      title: title.trim(),
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newToDo]);

    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleInput}
          />
          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0">Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <span className="error">{userError && 'Please choose a user'}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
