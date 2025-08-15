import './App.scss';
import { TodoList } from './components/TodoList';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

function getTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId) as User,
  }));
}

enum ValidationErrors {
  UserInput = 'Please choose a user',
  TitleInput = 'Please enter a title',
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(getTodos());
  const [title, setTitle] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    title: '',
    user: '',
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setValidationErrors(errors => ({
      ...errors,
      title: '',
    }));
  }

  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(+e.target.value);
    setValidationErrors(errors => ({
      ...errors,
      user: '',
    }));
  }

  function addTodo(todoTitle: string, userId: number) {
    const user = getUserById(userId) as User;
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxId + 1,
      userId,
      title: todoTitle,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedUser) {
      setValidationErrors(errors => ({
        ...errors,
        user: ValidationErrors.UserInput,
      }));
    }

    if (!title.trim()) {
      setValidationErrors(errors => ({
        ...errors,
        title: ValidationErrors.TitleInput,
      }));
    }

    if (!selectedUser || !title.trim()) {
      return;
    }

    addTodo(title, selectedUser);

    setTitle('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="do homework"
            onChange={handleTitleChange}
          />
          {validationErrors.title && (
            <span className="error">{validationErrors.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            defaultValue={'0'}
            value={selectedUser}
            id="user"
            name="user"
            data-cy="userSelect"
            onChange={handleUserChange}
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

          {validationErrors.user && (
            <span className="error">{validationErrors.user}</span>
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
