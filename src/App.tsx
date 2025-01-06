import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UserInfo } from './components/UserInfo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export const App = ({}) => {
  const [todoList, setTodoList] = useState([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [userValue, setUserValue] = useState(0);
  const [inputError, setInputError] = useState('');
  const [selectError, setSelectError] = useState('');

  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const todos = todoList.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  function getNewId(listOfTodos: Todo[]) {
    const maxId = Math.max(...listOfTodos.map(todo => todo.id));

    return maxId + 1;
  }

  const handleInputError = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
    setInputError('');
  };

  const handleSelectError = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setUserValue(+event.target.value);
    setSelectError('');
  };

  const cleanForm = () => {
    setTitle('');
    setUserValue(0);
    setInputError('');
    setSelectError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const todo: Todo = {
      id: getNewId(todos),
      title: title,
      userId: userValue,
      completed: false,
    };

    if (!title && !userValue) {
      setInputError('Please enter a title');
      setSelectError('Please choose a user');
    } else if (!title) {
      setInputError('Please enter a title');
    } else if (!userValue) {
      setSelectError('Please choose a user');
    } else {
      setTodoList([...todoList, todo]);
      cleanForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInputError}
          />
          <span className="error">{inputError}</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userValue}
            onChange={handleSelectError}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            <UserInfo users={usersFromServer} />
          </select>

          <span className="error">{selectError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
