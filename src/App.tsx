import './App.scss';

import { useEffect, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';
import { findUserByTodoUserId } from './helpers/findUserByTodoUserId';

interface FormValue {
  userId: string;
  title: string;
  emptyTitleError: boolean;
  emptyUserError: boolean;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    userId: '0',
    title: '',
    emptyTitleError: false,
    emptyUserError: false,
  });

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = formValue;
    let error = false;

    if (userId === '0') {
      setFormValue((prevState) => ({ ...prevState, emptyUserError: true }));
      error = true;
    }

    if (title === '') {
      setFormValue((prevState) => ({ ...prevState, emptyTitleError: true }));
      error = true;
    }

    if (error) {
      return;
    }

    const userIdNumber = +userId;
    const user = findUserByTodoUserId(users, userIdNumber);

    if (user) {
      const newTodo = {
        id:
          todos.sort((todoA, todoB) => todoA.id - todoB.id)[todos.length - 1]
            .id + 1,
        title: formValue.title,
        completed: false,
        userId: userIdNumber,
      };

      setTodos([...todos, newTodo]);
    }

    setFormValue({
      userId: '0',
      title: '',
      emptyTitleError: false,
      emptyUserError: false,
    });
  };

  const { title, userId } = formValue;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="GET" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              if (formValue.emptyTitleError && event.target.value !== '') {
                setFormValue((prevState) => ({
                  ...prevState,
                  emptyTitleError: false,
                }));
              }

              setFormValue((prevState) => ({
                ...prevState,
                title: event.target.value,
              }));
            }}
          />

          {formValue.emptyTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              if (formValue.emptyUserError && event.target.value !== '0') {
                setFormValue((prevState) => ({
                  ...prevState,
                  emptyUserError: false,
                }));
              }

              setFormValue((prevState) => ({
                ...prevState,
                userId: event.target.value,
              }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {formValue.emptyUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
