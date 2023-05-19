import "./App.scss";

import { useEffect, useState } from "react";
import usersFromServer from "./api/users";
import todosFromServer from "./api/todos";
import { TodoList } from "./components/TodoList";
import { User } from "./types/user";
import { Todo } from "./types/todo";
import { findUserByTodoUserId } from "./helpers/findUserByTodoUserId";

interface FormValue {
  userId: number;
  title: string;
  emptyTitleError: boolean;
  emptyUserError: boolean;
}

const defaultFormValue: FormValue = {
  userId: 0,
  title: "",
  emptyTitleError: false,
  emptyUserError: false,
};

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formValue, setFormValue] = useState<FormValue>(defaultFormValue);

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = formValue;
    let error = false;

    if (!userId) {
      setFormValue((prevState) => ({ ...prevState, emptyUserError: true }));
      error = true;
    }

    if (!title) {
      setFormValue((prevState) => ({ ...prevState, emptyTitleError: true }));
      error = true;
    }

    if (error) {
      return;
    }

    const user = findUserByTodoUserId(users, userId);

    if (user) {
      const newTodo = {
        id:
          todos.sort((todoA, todoB) => todoA.id - todoB.id)[todos.length - 1]
            .id + 1,
        title: formValue.title,
        completed: false,
        userId: userId,
      };

      setTodos([...todos, newTodo]);
    }

    setFormValue(defaultFormValue);
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
              if (formValue.emptyTitleError && event.target.value) {
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
            value={userId.toString()}
            onChange={(event) => {
              if (formValue.emptyUserError && +event.target.value) {
                setFormValue((prevState) => ({
                  ...prevState,
                  emptyUserError: false,
                }));
              }

              setFormValue((prevState) => ({
                ...prevState,
                userId: +event.target.value,
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
