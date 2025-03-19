import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, TodosUser, TodoItem } from './types/todo';
import { TodoList } from './components/TodoList';
import { FormEvent, ChangeEvent, useState } from 'react';

function getUser(id: number): TodosUser {
  const currentUser = usersFromServer.find(user => user.id === id);

  if (currentUser) {
    return currentUser;
  }

  return {
    id: 0,
    name: 'No name',
    username: 'No nick name',
    email: 'no email',
  };
}

const todos: Todo[] = todosFromServer.map((todo: TodoItem) => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

function getNewTodoId(todosList: Todo[]) {
  const newId = Math.max(...todosList.map(todo => todo.id));

  return newId + 1;
}

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [hasTitleInputError, setHasTitleInputError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todosList, setTodoList] = useState(todos);

  const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    setHasTitleInputError(false);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  function resetPostForm() {
    setTitleInput('');
    setUserId(0);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleInputError(!titleInput);
    setHasUserIdError(!userId);

    if (!titleInput || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todosList),
      title: titleInput,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodoList((currentTodos: Todo[]) => [...currentTodos, newTodo]);
    resetPostForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:&nbsp;&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleTitleInput}
              value={titleInput}
            />
          </label>
          {hasTitleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
              required
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
