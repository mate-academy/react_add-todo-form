import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const prepared = () => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }));
  };

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [prepare, setPrepare] = useState(prepared);

  const addNewTodo = () => {
    const newTodo = {
      userId,
      id: todos.length + 1,
      title,
      completed: false,
      user: users.find(user => user.id === userId) || null,
    };

    todos.push(newTodo);

    setPrepare([...prepare, newTodo]);
    setUserId(0);
    setTitle('');
  };

  return (
    <div className="App">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (title === '') {
            setTitleError(true);
          }

          if (userId === 0) {
            setUserIdError(true);
          }

          if (title !== '' && userId !== 0) {
            addNewTodo();
          }

          setTitle('');
          setUserId(0);
        }}
      >
        <div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">
              Please enter the title
            </span>
          )}

        </div>

        <div>
          <select
            value={userId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setUserId(Number(event.target.value));
              setUserIdError(false);
            }}
          >
            <option
              value={0}
            >
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todoList={prepare} />

    </div>
  );
};

export default App;
