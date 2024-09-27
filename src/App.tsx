import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDo } from './components/types/ToDo';
import { User } from './components/types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';

export const initialTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewToDoId(todos: ToDo[]) {
  const MaxId = Math.max(...todos.map(todo => todo.id));

  return MaxId + 1;
}

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, sethasUserError] = useState(false);
  const [todos, setTodos] = useState<ToDo[]>(initialTodos);
  const cleanedTitle = title.trim().replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    sethasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    sethasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    sethasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    if (cleanedTitle === '') {
      setHasTitleError(true);

      return;
    }

    const newTodo = {
      id: getNewToDoId(todos),
      title: cleanedTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">Subject</label>

          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
