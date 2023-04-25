import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [userIsntSelected, setUserIsntSelected] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setIsTitleEmpty(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserIsntSelected(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setIsTitleEmpty(true);
    }

    if (userId === '0') {
      setUserIsntSelected(true);
    }

    if (title !== '' && userId !== '0') {
      const newTodo: Todo = {
        id: todos.length + 1,
        title: title.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''),
        completed: false,
        userId: parseInt(userId, 10),
        user: getUser(parseInt(userId, 10)),
      };

      visibleTodos.push(newTodo);

      setTitle('');
      setUserId('0');
      setIsTitleEmpty(false);
      setUserIsntSelected(false);
      setVisibleTodos(visibleTodos);
    }
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
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {isTitleEmpty && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {userIsntSelected && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <h1 className="App__title">Static list of todos</h1>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
