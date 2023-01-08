import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const maxTodoId = initialTodos
  .map(todo => todo.id)
  .sort((a, b) => a - b)[initialTodos.length - 1];

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [todoId, setTodoId] = useState(maxTodoId);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyUser, setIsEmptyUser] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsEmptyTitle(false);
    }
  };

  const changeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (+event.target.value !== 0) {
      setIsEmptyUser(false);
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (title.trim() === '' || userId === 0) {
      if (title.trim() === '') {
        setIsEmptyTitle(true);
      }

      if (userId === 0) {
        setIsEmptyUser(true);
      }

      return;
    }

    setTodoId(prevId => prevId + 1);

    const currTodo: Todo = {
      id: todoId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTodos(prevTodos => [...prevTodos, currTodo]);
    setTitle('');
    setUserId(0);
    setIsEmptyTitle(false);
    setIsEmptyUser(false);
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={changeTitle}
          />
          {
            isEmptyTitle
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={changeId}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isEmptyUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
