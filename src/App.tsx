import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleErorr, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const getTodoWithUsers = () => {
    return todos.map(todo => {
      const user = usersFromServer.find(
        currUser => currUser.id === todo.userId,
      );

      if (!user) {
        throw new Error('!user');
      }

      return {
        ...todo,
        user,
      };
    });
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const onSubmit = (newTodo: Todo) => {
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const currentTodo = {
      ...newTodo,
      id: newId,
    };

    setTodos(currentTodos => [...currentTodos, currentTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: usersFromServer.find(user => user.id === userId) || null,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={onTitleChange}
          />
          {hasTitleErorr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:&nbsp;</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={onUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(currUser => (
              <option key={currUser.id} value={currUser.id}>
                {currUser.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
      <TodoList todos={getTodoWithUsers()} />
    </div>
  );
};
