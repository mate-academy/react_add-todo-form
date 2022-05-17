import React, { useState } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './Components/Types/Types';

const findUserById = (userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const todosWithUser = todos.map(todo => (
  { ...todo, user: findUserById(todo.userId) }
));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [toDos, setToDos] = useState(todosWithUser);

  const addNewTodo = () => {
    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title.trim() !== '' && userId !== 0) {
      const newTodo = {
        userId,
        id: toDos.length + 1,
        title,
        completed: false,
        user: findUserById(userId),
      };

      setToDos((currentTodos) => [...currentTodos, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  const setNewUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <div>
        <TodoList visibleTodos={toDos as Todo[]} />
      </div>

      <form
        className="form"
        action="post"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo();
        }}
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            onFocus={() => {
              setTitle('');
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
            onChange={setNewUser}
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
          className="button"
          type="submit"
        >
          Add
        </button>

      </form>
    </div>
  );
};

export default App;
