import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { FormFields } from './types/FormFields';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const addTodo = (formFields: FormFields) => {
    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: formFields.titleInput,
      completed: false,
      userId: +formFields.userSelect,
    };

    setTodos((currentTodos: Todo[]) => {
      return [
        ...currentTodos,
        newTodo,
      ];
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {
      errors,
    },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (formFields) => {
    addTodo(formFields);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              {...register('titleInput', {
                required: 'Please enter a title',
                pattern: {
                  value: /^[A-ZА-ЯЄІЇ0-9\s]+$/gi,
                  message: 'Title is not correct',
                },
                validate: (value: string) => (
                  !!value.trim() || 'Title contains only spaces'
                ),
                onChange: ({ target: { value } }) => {
                  const newValue = value.replace(/[^A-ZА-ЯЄІЇ0-9\s]+/gi, '');

                  setValue('titleInput', newValue);

                  return newValue;
                },
              })}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
            />
          </label>

          {errors.titleInput?.message && (
            <span className="error">
              {errors.titleInput.message}
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              {...register('userSelect', {
                validate: (value: string) => (
                  value !== '0' || 'Please choose a user'
                ),
              })}
              data-cy="userSelect"
              defaultValue="0"
            >
              <option value="0" disabled>Choose a user</option>

              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {errors.userSelect?.message && (
            <span className="error">
              {errors.userSelect.message}
            </span>
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
