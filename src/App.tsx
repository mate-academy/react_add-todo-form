import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './components/interfaces/interfaces';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) as User;
}

const todoListWithUser = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

function getFilteredTitleInput(titleInput: string) {
  return titleInput
    .split('')
    .filter((char: string | number) => (char >= 'a' && char <= 'z')
      || (char >= 'A' && char <= 'Z')
      || (char >= 'а' && char <= 'я')
      || (char >= 'А' && char <= 'Я')
      || (char >= '0' && char <= '9')
      || char === ' ')
    .join('');
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todoListWithUser);
  const [titleInput, setTitleImput] = useState('');
  const [errorTitleInput, setErrorTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [errorUserSelect, setErrorUserSelect] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const filteredTitleInput = getFilteredTitleInput(titleInput);

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: filteredTitleInput,
      completed: false,
      userId: userSelect,
      user: getUserById(userSelect),
    };

    if (!titleInput) {
      setErrorTitleInput('Please enter a title');
    }

    if (!userSelect) {
      setErrorUserSelect('Please choose a user');
    }

    if (!titleInput || !userSelect) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitleImput('');
    setUserSelect(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            placeholder="Enter a title"
            onChange={(event) => {
              setTitleImput(event.target.value);
              setErrorTitleInput('');
            }}
          />
          {errorTitleInput && (
            <span className="error">{errorTitleInput}</span>
          )}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={event => {
              setUserSelect(+event.target.value);
              setErrorUserSelect('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user?.name}
              </option>
            ))}
          </select>
          {errorUserSelect && (
            <span className="error">{errorUserSelect}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
