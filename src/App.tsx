import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

enum FormType {
  newTitleForm = 'newTitleForm',
  userSelectForm = 'userSelectForm',
}

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type ChangeableElement = HTMLInputElement | HTMLSelectElement;

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState(todos);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [newTodoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleErrorStatus] = useState(false);
  const [userError, setUserErrorStatus] = useState(false);

  const handleChange = (event: React.ChangeEvent<ChangeableElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case FormType.newTitleForm.toString():
        setTitleErrorStatus(false);
        setTodoTitle(value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
        break;

      case FormType.userSelectForm.toString():
        setUserErrorStatus(false);
        setChosenUser(getUserById(+value));
        break;

      default: throw new Error('error');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!chosenUser) {
      setUserErrorStatus(true);
    }

    if (!newTodoTitle.trim()) {
      setTitleErrorStatus(true);
    }

    if (!chosenUser || !newTodoTitle.trim()) {
      return;
    }

    const newTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newTodoId,
      userId: chosenUser ? chosenUser.id : -1,
      title: newTodoTitle,
      completed: false,
      user: chosenUser,
    };

    setTodos([
      ...visibleTodos,
      newTodo,
    ]);

    setChosenUser(null);
    setTodoTitle('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="newTitleForm">Title: </label>
          <input
            name="newTitleForm"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={handleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelectForm">User: </label>
          <select
            name="userSelectForm"
            data-cy="userSelect"
            defaultValue="0"
            value={chosenUser?.id || '0'}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            { usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            )) }
          </select>

          {userError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
