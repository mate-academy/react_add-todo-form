import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodo] = useState<Todo[]>(todosFromServer);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUser, setIsUser] = useState(true);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (title.trim() === '') {
      setIsTitle(false);
      valid = false;
    }

    if (selectedUserId === '') {
      setIsUser(false);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
    const user = users.find(u => u.id === selectedUserId)!;
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodo([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            required
            value={title}
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={e => {
              const value = e.target.value.replace(
                /[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g,
                '',
              );

              setTitle(value);
              setIsTitle(true);
            }}
          />
          {!isTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(
                event.target.value === '' ? '' : Number(event.target.value),
              );
              setIsUser(true);
            }}
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
