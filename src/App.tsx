import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoType, TodoWithUser } from './types/TodoType';
import { useState } from 'react';

function calcNewTodoId(todos: TodoType[]) {
  return Math.max(...todos.map(user => user.id)) + 1;
}

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [titleMessage, setTitleMessage] = useState(false);
  const [inputUserId, setInputUserId] = useState('');
  const [userMessage, setUserMessage] = useState(false);

  const [todosWithUsers, setTodosWithUsers] = useState<TodoWithUser[]>(
    todosFromServer.map(todo => {
      const foundUser = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: foundUser,
      };
    }),
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleMessage(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputUserId(event.target.value);
    setUserMessage(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputTitle !== '' && inputUserId !== '') {
      const selectedUser = usersFromServer.find(
        user => user.id === +inputUserId,
      );

      setTodosWithUsers(previousState => [
        ...previousState,
        {
          id: calcNewTodoId(previousState),
          title: inputTitle,
          completed: false,
          userId: selectedUser?.id,
          user: selectedUser,
        } as TodoWithUser,
      ]);

      setInputTitle('');
      setInputUserId('');
      setTitleMessage(false);
      setUserMessage(false);
    } else {
      setTitleMessage(!inputTitle);
      setUserMessage(!inputUserId);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputTitle}
            onChange={handleTitleChange}
          />
          {titleMessage && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={inputUserId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userMessage && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
