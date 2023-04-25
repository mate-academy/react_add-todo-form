import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const getMaxId = (todos: Omit<Todo, 'user'>[]) => {
  const todoIds = todos.map((todo) => todo.id);

  return Math.max(...todoIds);
};

const fillTodosWithUser = (todos: Omit<Todo, 'user'>[]) => {
  return todos.map((todo) => {
    const findUser = usersFromServer.find((user) => user.id === todo.userId);

    return { ...todo, user: findUser || null };
  });
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (event.target.value) {
      setIsValidTitle(true);
    }
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (event.target.value) {
      setIsValidUser(true);
    }
  };

  const maxId = getMaxId(todos);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.length || !userId) {
      setIsValidTitle(!!title.length);
      setIsValidUser(!!userId);
    } else {
      const newTodo = {
        id: maxId + 1,
        title,
        completed: false,
        userId,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {!isValidTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          {!isValidUser
            && (<span className="error">Please choose a user</span>
            )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={fillTodosWithUser(todos)} />
    </div>
  );
};
