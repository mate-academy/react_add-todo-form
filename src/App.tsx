import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          const isTitleInvalid = title.trim() === '';
          const isUserInvalid = userId === 0;

          setTitleError(isTitleInvalid);
          setUserError(isUserInvalid);

          if (!isTitleInvalid && !isUserInvalid) {
            const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
            const selectedUser = usersFromServer.find(
              user => user.id === userId,
            )!;
            const newTodo = {
              id: newId,
              title: title,
              completed: false,
              userId: userId,
              user: selectedUser,
            };

            setTodos(prev => [...prev, newTodo]);
            setTitle('');
            setUserId(0);
            setTitleError(false);
            setUserError(false);
          }
        }}
      >
        <label>
          Title:
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);

                if (event.target.value.trim() !== '') {
                  setTitleError(false);
                }
              }}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </div>
        </label>

        <label>
          User:
          <div className="field">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={user => {
                const value = Number(user.target.value);

                setUserId(value);

                if (value !== 0) {
                  setUserError(false);
                }
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            {userError && <span className="error">Please choose a user</span>}
          </div>
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
