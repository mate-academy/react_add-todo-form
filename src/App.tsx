import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

export const App = () => {
  const initialTodos: Todo[] = [];

  todosFromServer.forEach(todo => {
    const user = getUserById(todo.userId);

    if (user) {
      initialTodos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
        user,
      });
    }
  });
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [userId, setUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleTitleChange(newTitle: string) {
    const newValue = newTitle.replace(/[^A-Za-zА-Яа-яЇїІіЄєҐґ0-9 ]+/g, '');

    setTitleError(false);
    setTitle(newValue);
  }

  function handleUserChange(newUserId: string) {
    setUserError(false);
    setUserId(newUserId);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUser = getUserById(+userId);

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!newUser || +userId === 0) {
      setUserError(true);
    }

    if (!title.trim() || !newUser || +userId === 0) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : -1;

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      user: newUser,
      userId: +userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId('0');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={event => handleSubmit(event)}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
          />
          {titleError ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            value={userId}
            data-cy="userSelect"
            name="user"
            onChange={event => handleUserChange(event.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
