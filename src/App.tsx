import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './models/User';
import { TodoWithUser } from './models/Todo';
import { FormErrors, FormKeys, FormValues, defaultValues } from './models/Form';
import { getUserById, validate } from './utils/functions';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | undefined>();

  const reset = () => {
    setValues(defaultValues);
    setCount(prev => prev + 1);
  };

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        completed: false,
        id: currentTodos.length,
        title: values.title,
        userId: values.userId,
        user,
      },
    ]);

    reset();
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues(currentValues => {
      let currentValue;

      switch (name) {
        case FormKeys.USER_ID:
          if (+value === 0) {
            setUser(undefined);
            currentValue = 0;
            break;
          }

          const findCurrentUser = usersFromServer.find(
            currentUser => +value === currentUser.id,
          ) as User;

          setUser(findCurrentUser);
          currentValue = +value + 1;
          break;

        default:
          currentValue = value;
      }

      return {
        ...currentValues,
        [name]: currentValue,
      };
    });

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo} key={count}>
        <div className="field">
          <input
            name={FormKeys.TITLE}
            type="text"
            data-cy="titleInput"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name={FormKeys.USER_ID}
            onChange={handleChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(currentUser => (
              <option value={currentUser.id} key={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
