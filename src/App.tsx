import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todosArray = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosArray);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userId: '0', // or '' — must match the <option> value of "Choose a user"
      title: '',
    },
  });

  const onSubmit = data => {
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: data.title,
      completed: false,
      userId: +data.userId,
      user: getUserById(+data.userId),
    };

    setTodos([...todos, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input
            {...register('title', { required: true })}
            type="text"
            data-cy="titleInput"
            placeholder="enter a text"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            {...register('userId', {
              validate: value => value !== '0',
            })}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
