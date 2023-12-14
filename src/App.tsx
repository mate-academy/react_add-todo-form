import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/todo';

const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(
    (user) => user.id === userId,
  );

  return foundUser;
};

const initialTodo: Todo[] = todosFromServer.map(
  (todo) => ({
    ...todo,
    user: getUser(todo.userId),
  }),
);

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(initialTodo);
  const trimTitle = title.trim();

  const handeTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const addNewTodo = () => {
    const idList = todos.map(
      todo => todo.id,
    );

    const maxIdPlusOne = Math.max(...idList) + 1;

    const newTodo: Todo = {
      id: maxIdPlusOne,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTodos((prevTodos) => ([...prevTodos, newTodo]));

    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (trimTitle && userId > 0) {
      addNewTodo();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handeTitleChange}
            />
          </label>

          {titleError
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label htmlFor="user">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              defaultValue={0}
              required
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option 
                key={id} 
                value={id}>
            {name}
              </option>
              ))}

              ))}
            </select>
          </label>
          {userError
            && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
