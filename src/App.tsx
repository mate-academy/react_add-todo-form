import React, { useState } from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './react-app-env';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(person => todo.userId === person.id) || null,
}));

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [userName, setUserName] = useState(0);
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      userId: userName,
      id: todosList[todosList.length - 1].id + 1,
      title: todoTitle,
      completed: false,
      user: users.find(user => user.id === userName) || null,
    };

    setError(!userName || !todoTitle);

    if (userName && todoTitle) {
      setTodosList([...todosList, newUser]);
      setUserName(0);
      setTodoTitle('');
    }
  };

  return (
    <div className="app">
      <h1 className="title">
        ADD TODO FORM
      </h1>

      <form
        className="app__form"
        method="GET"
        onSubmit={handleSubmit}
      >
        <input
          className="title-input app__form--item"
          type="text"
          data-cy="titleInput"
          placeholder="Please enter the title"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
            setError(false);
          }}
        />

        {(!todoTitle && error) && (
          <span className="app__form--item error">
            Please enter the title
          </span>
        )}

        <select
          className="app__form--item user-select"
          name="user"
          id="choose-user"
          value={userName}
          data-cy="userSelect"
          onChange={(e) => {
            setUserName(+e.target.value);
            setError(false);
          }}
        >
          <option disabled value="0">
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {(!userName && error) && (
          <span className="app__form--item error">
            Please choose a user
          </span>
        )}

        <button
          className="app__form--item button"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
