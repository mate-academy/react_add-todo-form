import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isInputTitleTitle, setIsInputTitleTitle] = useState(false);
  const [isSelectedUser, setIsSelectedUserUser] = useState(false);

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const findSelectedUser = usersFromServer
      .find(user => user.name === selectedUser);
    const isValideInputTitle = inputTitle.replace(/\s/g, '').trim().length;
    const createId = Math.max(...todos.map(todo => Number(todo.id)));

    const addTodo = {
      id: createId,
      title: inputTitle,
      completed: false,
      userId: (findSelectedUser ? findSelectedUser.id : 0),
    };

    if (isValideInputTitle > 0) {
      setIsInputTitleTitle(false);
    } else {
      setIsInputTitleTitle(true);
    }

    if (findSelectedUser) {
      setIsSelectedUserUser(false);
    } else {
      setIsSelectedUserUser(true);
    }

    if (isValideInputTitle > 0 && addTodo.userId !== 0) {
      setTodos([...todos, addTodo]);
      setInputTitle('');
      setSelectedUser('');
    }
  }

  function titleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setInputTitle(event.target.value);
    setIsInputTitleTitle(false);
  }

  function userSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(event.target.value);
    setIsSelectedUserUser(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          submitForm(event);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInputTitle"
            value={inputTitle}
            onChange={(event) => titleSelect(event)}
          />
          {isInputTitleTitle
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => userSelect(event)}
          >
            <option value="0" key={uuidv4()}>Choose a user</option>
            {[...usersFromServer].map(user => (
              <option value={user.name} key={uuidv4()}>{user.name}</option>
            ))}
          </select>
          {isSelectedUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onChange={() => setTodos(todos)}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
