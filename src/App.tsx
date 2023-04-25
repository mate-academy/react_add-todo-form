import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const [todos, setTodos] = useState(todosFromServer.map(todo => {
    const user = usersFromServer
      .find(serverUser => serverUser.id === todo.userId) || null;

    return { ...todo, user };
  }));

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleEmpty(false);
  };

  const handleUserChange = (event: FormEvent<HTMLSelectElement>) => {
    setUserName(event.currentTarget.value);
    setIsUserSelected(false);
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedUser = usersFromServer.find(user => user.name === userName);
    const idArr = todos.map(todo => todo.id);
    const maxId = Math.max(...idArr);

    if (title.length < 1) {
      setIsTitleEmpty(true);
      if (!selectedUser) {
        setIsUserSelected(true);
      }
    } else if (!selectedUser) {
      setIsUserSelected(true);
    } else {
      setTodos([
        ...todos,
        {
          id: maxId + 1,
          userId: selectedUser?.id,
          title,
          completed: false,
          user: selectedUser || null,
        }]);
      setTitle('');
      setUserName('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {(isTitleEmpty)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={userName}
          >
            <option defaultChecked>Choose a user</option>
            {usersFromServer
              .map(user => <option key={user.id}>{user.name}</option>)}
          </select>

          {(isUserSelected)
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
