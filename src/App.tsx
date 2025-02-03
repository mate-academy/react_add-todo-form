import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TODO } from './types/TodoType';
import { USER } from './types/UserType';
import { FormValues } from './types/FormValues';
import { formValidation } from './utils/formValidation';
import { getMaxId } from './utils/getMaxId';

export const App = () => {
  const [users] = useState<USER[]>(usersFromServer);
  const [todos, setTodos] = useState<TODO[]>(todosFromServer);
  const [values, setValues] = useState<FormValues>({
    title: '',
    userId: '0',
  });
  const [titleError, setTitleError] = useState<string>('');
  const [userSelectError, setUserSelectError] = useState<string>('');

  const isFormValid: boolean = formValidation(values);
  const handleChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.title.trim().length === 0) {
      setTitleError('Please enter a title');
    }

    if (values.userId === '0') {
      setUserSelectError('Please choose a user');
    }

    if (isFormValid) {
      setTodos(prev => [
        ...prev,
        {
          id: getMaxId(todos) + 1,
          title: values.title,
          completed: false,
          userId: Number(values.userId),
        },
      ]);

      setValues({
        title: '',
        userId: '0',
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={values.title}
            onChange={handleChangeEvent}
            placeholder="title"
            onBlur={() =>
              setTitleError(
                values.title.trim().length === 0 ? 'Please enter a title' : '',
              )
            }
            required
          />
          {values.title.trim().length === 0 && titleError.length > 0 && (
            <span className="error">{titleError}</span>
          )}
        </div>

        <div className="field">
          <select
            required
            name="userId"
            data-cy="userSelect"
            onChange={handleChangeEvent}
            value={values.userId}
            onBlur={() =>
              setUserSelectError(
                values.userId === null ? 'Please choose a user' : '',
              )
            }
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(u => (
              <option key={u.id} value={u.id.toString()}>
                {u.name}
              </option>
            ))}
          </select>
          {values.userId === '0' && userSelectError.length > 0 && (
            <span className="error">{userSelectError}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={[...todos].map(todo => {
          const foundUser = users.filter(u => u.id === todo.userId)[0];

          return {
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            user: foundUser,
          };
        })}
      />
    </div>
  );
};
