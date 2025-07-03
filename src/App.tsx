import { useState } from 'react';
import users from './api/users';
import './App.scss';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [user, setUser] = useState('0');
  const [title, setTitle] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [todoList, setTodoList] = useState(todos);
  const maxId = todoList.length
    ? Math.max(...todoList.map(todo => todo.id))
    : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (!title.trim() || user === '0') {
      return;
    }

    const final = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: Number(user),
    };

    setTodoList([...todoList, final]);
    setTitle('');
    setUser('0');
    setHasSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter a title"
          />
          {hasSubmitted && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(a => {
              return (
                <option value={a.id} key={a.id}>
                  {a.name}
                </option>
              );
            })}
          </select>

          {hasSubmitted && user === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} users={users} />
    </div>
  );
};
