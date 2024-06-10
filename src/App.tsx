import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoItem } from './types/TodoItem';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

function getNewTodoId(todos: TodoItem[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const validateTitle = /[^a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9 ]+/g;

const todos: TodoItem[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todo, setTodo] = useState<TodoItem[]>(todos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addToDo = (elem: TodoItem) => {
    const newToDo = {
      ...elem,
      id: getNewTodoId(todo),
      title: title.replace(validateTitle, ''),
    };

    setTodo(prev => [...prev, newToDo]);
  };

  function reset() {
    setTitle('');
    setHasTitleError(false);

    setUserId(0);
    setHasUserIdError(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    title.replace(validateTitle, '');

    addToDo({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
          {/* {!title.trim() && <span className="error">Title can`t be empty</span>} */}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            name="user"
            data-cy="userSelect"
            required
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todo} />
    </div>
  );
};
