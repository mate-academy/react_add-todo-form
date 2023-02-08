import React, { useState } from 'react';
import './App.scss';
import { nanoid } from 'nanoid';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/userType';
import { Todo } from './types/todoType';
import { TodoList } from './components/TodoList/TodoList';

export function getUser(userId:number):User | null {
  const foundUser = usersFromServer.find(user => userId === user.id);

  return foundUser || null;
}

export const fullTodoInfo:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(fullTodoInfo);
  const [titleEntered, setTitleEntered] = useState(true);
  const [userChosen, setUserChosen] = useState(true);

  const inputAddTodoId = nanoid();

  const generateTodoId = () => {
    return Math.max(...visibleTodos.map(todo => todo.id)) + 1;
  };

  const handleReset = () => {
    setUserId(0);
    setTitle('');
  };

  const addTodo = (id: number) => {
    if (getUser(id) && title.trim()) {
      const createNewTodo = {
        id: generateTodoId(),
        userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      setVisibleTodos((prevTodos) => ([
        ...prevTodos,
        createNewTodo,
      ]
      ));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      setUserId(0);
      setUserChosen(false);
    }

    if (!title.trim()) {
      setTitleEntered(false);
    }

    addTodo(userId);
    handleReset();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleEntered(true);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserChosen(true);
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
          <label htmlFor={inputAddTodoId}>Title:</label>

          <input
            type="text"
            data-cy="titleInput"
            id={inputAddTodoId}
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {!titleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!userChosen && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
