import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

export function getUserFromId(userId: number): User | null {
  return usersFromServer.find((person) => person.id === userId) || null;
}

export const todosWithUser: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserFromId(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const userList = usersFromServer;
  let highestTodoId = Math.max(...todos.map(todo => (todo.id)));

  function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    // I opted to do the optional instruction
    const legalCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890 ' /* 'en' */
      + 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'; /* 'ru' */
    const croppedInput = event.target.value.split('').filter((char) => (
      legalCharacters.includes(char.toLowerCase()) || char === ' '
    )).join('');

    setTitle(croppedInput);

    if (titleError && croppedInput.length > 0) {
      setTitleError(false);
    }
  }

  function changeUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));

    if (userIdError && Number(event.target.value) > 0) {
      setUserIdError(false);
    }
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.length > 0 && userId > 0) {
      highestTodoId += 1;

      const newTodo = {
        id: highestTodoId + 0, // This is to ensure it isn't a reference
        title,
        completed: false,
        userId,
        user: getUserFromId(userId),
      };

      setTodos([...todos, newTodo]);
      setUserId(0);
      setTitle('');
    } else {
      if (title.length === 0) {
        setTitleError(true);
      }

      if (userId <= 0) {
        setUserIdError(true);
      }
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
          </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={changeTitle}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}
          </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {userList.map((person) => {
              const { id, name } = person;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {userIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {todos && <TodoList todos={todos} />}
    </div>
  );
};
