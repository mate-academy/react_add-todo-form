import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || undefined;
};

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  let maxId = visibleTodos.reduce((max, item) => {
    return item.id > max ? item.id : max;
  }, 0);

  maxId += 1;

  const todos = visibleTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const handlerChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);

    const sanitizedTitle = event.target.value
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(sanitizedTitle);
  };

  const handlerChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setSelectedUserId(+event.target.value);
  };

  const handlerAddTodo = (newTodo: Todo) => {
    setVisibleTodos(allTodos => [...allTodos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError(!title);
    setUserError(!selectedUserId);

    const newTodo = {
      id: maxId,
      title,
      completed: false,
      userId: selectedUserId,
    };

    if (title && selectedUserId) {
      handlerAddTodo(newTodo);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handlerSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title">
            {'Title: '}
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handlerChangeTitle}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            {'User: '}
          </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={handlerChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
