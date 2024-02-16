import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const visibleTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find((usr: User) => usr.id === todo.userId);

  if (!user) {
    throw new Error(`User with id ${todo.userId} not found`);
  }

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(visibleTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, settitleError] = useState(false);
  const [userError, setuserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.replace(/[^a-zA-Z0-9а-яА-Я ]/g, '');

    setTitle(newTitle);
    settitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setuserError(false);
  };

  const setNewTodoId = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    settitleError(!title.trim());
    setuserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const user = usersFromServer.find((usr: User) => usr.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: setNewTodoId(),
      title,
      userId,
      user,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmitHandler}>
        <div className="field">
          <label htmlFor="todo-title">Title:&nbsp;&nbsp;</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="user-select">User:&nbsp;&nbsp;</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          {
            userError
            && <span className="error">Please select a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
