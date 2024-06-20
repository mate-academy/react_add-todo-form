import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleInsertTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(getUserById(Number(event.target.value)));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === '') {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (user && title.trim()) {
      setTodoList(stateTodos => [
        ...stateTodos,
        {
          id:
            stateTodos.reduce((acc, current) => Math.max(current.id, acc), -1) +
            1,
          title: title,
          completed: false,
          userId: user.id,
          user: user,
        },
      ]);
      setTitle('');
      setUser(null);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={title}
            onChange={handleInsertTitle}
            type="text"
            data-cy="titleInput"
            placeholder="Type a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={user?.id || 0}
            onChange={handleSelect}
            data-cy="userSelect"
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(users => (
              <option value={users.id} key={users.id}>
                {users.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
