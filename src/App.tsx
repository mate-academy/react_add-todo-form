import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userInfo, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todoList, setTodoList] = useState(todosFromServer);

  const todoId = Math.max(...todoList.map(list => list.id));

  const addTodo = (newTodo: Todo) => {
    setTodoList(prevTodo => [...prevTodo, newTodo]);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+e.target.value);
    setUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(!title);
    setUserError(!userInfo);

    if (!title || !userInfo) {
      return;
    }

    addTodo({
      id: todoId + 1,
      title,
      completed: false,
      userId: userInfo,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userInfo}
            onChange={handleUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
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
