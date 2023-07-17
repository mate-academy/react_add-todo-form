import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './models/Todo';
import { getNewTodoId, getUserById } from './services/user.service';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setVisibleTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);

    setUserIdError(false);
    setTitleError(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserIdError(!selectedUserId);
    setTitleError(!title);

    if (!title || !selectedUserId) {
      return;
    }

    addTodo({
      title,
      id: getNewTodoId(visibleTodos),
      completed: false,
      userId: selectedUserId,
      user: getUserById(+selectedUserId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {
            titleError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))
            }
          </select>
          {
            userIdError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
