import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import './App.scss';

function getUserById(userId: number) {
  const foundUser = usersFromServer.find((user: User) => (
    user.id === userId
  ));

  return foundUser || null;
}

const updatedTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(updatedTodos);
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUser(false);
  };

  const getMaxId = () => {
    return todos.reduce((acumulator: number, todo: Todo) => {
      if (todo.id > acumulator) {
        return todo.id;
      }

      return acumulator;
    }, 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsUser(true);

      return;
    }

    if (!title) {
      setIsTitle(true);

      return;
    }

    const id = getMaxId() + 1;

    setTodos(
      [...todos,
        {
          id, title, completed: false, userId, user: getUserById(userId),
        },
      ],
    );

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>

          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={handleChangeSelect}
            >

              <option value={0} disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
