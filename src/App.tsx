import { ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoUser } from './types/Todo';

const getTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

const initialFormValues = { title: '', userId: 0 };
const initialFormErrors = { title: false, userId: false };

type FormValues = { title: string; userId: number };
type FormErrors = { title: boolean; userId: boolean };

export const App = () => {
  const [todos, setTodos] = useState<TodoUser[]>(getTodos);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const { title, userId } = formValues;
  const { title: titleError, userId: userIdError } = formErrors;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: prevState[name as keyof FormErrors] ? !value : false,
    }));

    setFormValues((prevState) => ({
      ...prevState,
      [name]: name === 'title' ? value : Number(value),
    }));
  };

  const getUser = (id: number) => {
    return usersFromServer.find(u => u.id === id);
  };

  const getNewId = () => Math.max(...todos.map(todo => todo.id)) + 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title: formTitle, userId: formUserId } = formValues;

    if (!formTitle || !formUserId) {
      setFormErrors({
        title: !formTitle,
        userId: !formUserId,
      });

      return;
    }

    const user = getUser(formUserId);

    const newTodo: TodoUser = {
      id: getNewId(),
      completed: false,
      title: formTitle,
      userId: user?.id,
      user,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    setFormValues(initialFormValues);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            name="title"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>

          <select
            id="userId"
            name="userId"
            data-cy="userSelect"
            value={userId}
            onChange={handleChange}
          >
            <option disabled value="0">
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
