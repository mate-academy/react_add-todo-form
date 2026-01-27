import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Task } from './types/Task';
import { Form } from './types/Form';
import { FormError } from './types/Error';
import { TodoList } from './components/TodoList';

const mapTask = (todo, users: User[]): Task => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
};

const getUserById = (id: number): User => {
  return usersFromServer.find(user => user.id === id);
};

const getTasks = () => {
  return todosFromServer.map(todo => mapTask(todo, usersFromServer));
};

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [form, setForm] = useState<Form>({
    title: '',
    userId: 0,
  });
  const [error, setError] = useState<FormError>({
    title: false,
    userId: false,
  });

  const setFormError = () => {
    setError(prev => ({
      ...prev,
      title: true,
    }));
  };

  const setUserError = () => {
    setError(prev => ({
      ...prev,
      userId: true,
    }));
  };

  const clearErrors = () => {
    setError({
      title: false,
      userId: false,
    });
  };

  const handelTitle = (input: string) => {
    setError(prev => ({
      ...prev,
      title: false,
    }));

    setForm(prev => ({
      ...prev,
      title: input,
    }));
  };

  const handelUser = (userId: number) => {
    setError(prev => ({
      ...prev,
      userId: false,
    }));

    setForm(prev => ({
      ...prev,
      userId,
    }));
  };

  const getNewId = () =>
    tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1;

  const clearForm = () => {
    setForm({
      title: '',
      userId: 0,
    });
  };

  const handelSubmit = () => {
    clearErrors();
    const titleError = form.title.length < 1;
    const userError = users.every(user => user.id !== form.userId);

    if (titleError) {
      setFormError();
    }

    if (userError) {
      setUserError();
    }

    if (titleError || userError) {
      return;
    }

    setTasks(prev => [
      ...prev,
      {
        id: getNewId(),
        title: form.title,
        userId: form.userId,
        completed: false,
        user: getUserById(form.userId),
      },
    ]);

    clearErrors();
    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          handelSubmit();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={form.title}
            onChange={event => handelTitle(event.target.value)}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={form.userId}
            onChange={event => handelUser(Number(event.target.value))}
          >
            <option key={0} value={0}>
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {error.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={tasks} />
    </div>
  );
};
