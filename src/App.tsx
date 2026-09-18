import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [titleInput, setTitleInput] = useState('');
  const [userInput, setUserInput] = useState(0);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyUser, setIsEmptyUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !titleInput;
    const isUserEmpty = !userInput;

    setIsEmptyTitle(isTitleEmpty);
    setIsEmptyUser(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: titleInput,
      completed: false,
      userId: userInput,
    };

    setTodos([...todos, newTodo]);

    setTitleInput('');
    setUserInput(0);
  };

  const visibleTodos = todos.map(todo => {
    const todoUser = usersFromServer.find(user => user.id === todo.userId)!;

    return {
      ...todo,
      user: todoUser,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          Title: &nbsp;
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={event => {
              setTitleInput(event.target.value);
              setIsEmptyTitle(false);
            }}
            placeholder="Enter a title"
          />
          {isEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User: &nbsp;
          <select
            data-cy="userSelect"
            value={userInput}
            onChange={event => {
              setUserInput(+event.target.value);
              setIsEmptyUser(false);
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
          {isEmptyUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
