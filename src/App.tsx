import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo, TodoWithUser } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [hasSubmited, setHasSubmited] = useState(false);

  //combine todos and users
  const todosWithUsers: TodoWithUser[] = todos
    .map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return user ? { ...todo, user } : null;
    })
    .filter((todo): todo is TodoWithUser => todo !== null);

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmited(true);

    if (!titleInput.trim() || !userSelect) {
      return;
    }

    const user = usersFromServer.find(u => u.id === userSelect);

    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: titleInput.trim(),
      completed: false,
      userId: userSelect,
      user: user,
    };

    setTodos([...todos, newTodo]);
    setTitleInput('');
    setUserSelect(0);
    setHasSubmited(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
          {!titleInput.trim() && hasSubmited && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={e => setUserSelect(+e.target.value)}
            value={userSelect}
          >
            <option value={0} disabled={true}>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userSelect === 0 && hasSubmited && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosWithUsers={todosWithUsers} />
    </div>
  );
};
