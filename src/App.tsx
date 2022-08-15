import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // eslint-disable-next-line no-console
  console.log(foundUser, userId);

  return foundUser || null;
}

const combinedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  userId: getUser(todo.userId),
}));

export const App = () => {
  const [todos, addTodos] = useState(combinedTodos);
  const [inputText, setInputText] = useState('');
  const [inputUserId, setInputUserId] = useState(-1);
  const [isValid, setIsValid] = useState(true);

  let largestId = todos.reduce((prev, curr) => (
    prev > curr.id
      ? prev
      : curr.id
  ), 0);

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputUserId === -1 || inputText.trim() === '') {
      setIsValid(false);

      return;
    }

    setIsValid(true);
    largestId += 1;

    const newTodo : Todo = {
      id: largestId,
      title: inputText,
      completed: false,
      userId: getUser(inputUserId),
    };

    addTodos([...todos, newTodo]);

    setInputText('');
    setInputUserId(-1);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <input
            type="text"
            name="todos"
            data-cy="titleInput"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value);
            }}
          />
          {!isValid
            && (inputText !== ''
            || (<span className="error">Please enter a title</span>))}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={inputUserId}
            onChange={(event) => {
              setInputUserId(+event.target.value);
            }}
          >
            <option
              value="-1"
              defaultValue="-1"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.username}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isValid
            && (inputUserId !== -1
            || (<span className="error">Please choose a user</span>))}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList allTodos={todos} />
    </div>
  );
};
