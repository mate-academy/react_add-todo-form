import { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const todosWithUser: Todo[] = todos.map(todo => ({
  ...todo,
  user: (users.find(user => user.id === todo.userId) || null),
}));

export const App: React.FC = () => {
  const [preparedTodos, setTodos] = useState([...todosWithUser]);
  const [title, setTitle] = useState('');
  const [todoUser, setTodoUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({
    titleError: false,
    userError: false,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        titleError: true,
      }));
    }

    if (todoUser === 0) {
      setErrors((prevState) => ({
        ...prevState,
        userError: true,
      }));
    }

    if (title.trim().length === 0 || todoUser === 0) {
      return;
    }

    const newTodo = {
      title,
      userId: +todoUser,
      completed,
      id: (Math.max(...preparedTodos.map(todo => todo.id)) + 1),
      user: users.find(user => user.id === +todoUser) || null,
    };

    setTodos([...preparedTodos, newTodo]);
    setTitle('');
    setTodoUser(0);
    setCompleted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(event) => {
                setTitle(event.target.value);
                setErrors({
                  ...errors,
                  titleError: false,
                });
              }}
            />

            {errors.titleError
              && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={todoUser}
              onChange={(event) => {
                setTodoUser(+event.target.value);
                setErrors({
                  ...errors,
                  userError: false,
                });
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>

            {errors.userError
              && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'This completed? '}
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={() => {
                setCompleted(!completed);
              }}
            />
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
