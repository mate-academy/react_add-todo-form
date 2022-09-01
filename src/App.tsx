import './App.scss';
import { FormEvent, useState } from 'react';
import classNames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface TodoWithoutUser {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface TodoWithUser extends TodoWithoutUser {
  user: User | null,
}

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(
  todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }),
);

interface Props {
  todos: TodoWithUser[]
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          className={classNames(`TodoInfo ${todo.completed && 'TodoInfo--completed'}`)}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
            {todo.user?.name}
          </a>
        </article>
      ))}
    </section>

  );
};

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState(todosWithUsers);

  const clearForm = () => {
    setTodoTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (!todoTitle.trim() || !userId) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const createdTodo: TodoWithUser = {
      id: maxId,
      title: todoTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((prevTodos) => [...prevTodos, createdTodo]);
    clearForm();
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
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
              if (hasTitleError) {
                setHasTitleError(false);
              }
            }}
            placeholder="Please enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              if (hasUserError) {
                setHasUserError(false);
              }
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {
              usersFromServer.map(user => {
                return (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                );
              })
            }
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
