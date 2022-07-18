import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedToDo } from './types/PreparedToDo';
import { User } from './types/User';

const preparedToDos: PreparedToDo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [usersData] = useState(users);
  const [ToDo, setTodos] = useState(preparedToDos);
  const [title, setTitle] = useState('');
  const [name, setUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorName, setErrorName] = useState('');

  const nameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setErrorName('');
    setErrorTitle('');
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorName('');
    setErrorTitle('');
  };

  const validationHandler = () => {
    const todoTitle = title;
    const todoUserName = name;
    let errTitle = '';
    let errName = '';

    if (todoTitle === '') {
      errTitle = 'Please enter the title';
    }

    if (todoUserName === '') {
      errName = 'Please choose a user';
    }

    setErrorName(errName);
    setErrorTitle(errTitle);

    return errName.length === 0 && errTitle.length === 0;
  };

  const addTODO = (event: React.FormEvent) => {
    event.preventDefault();

    if (validationHandler()) {
      const createdUser: User | undefined = usersData
        .find(a => a.name === name);
      const preparedTitle = title
        .replace(/[`!@#$%^&*()_+\-=\\[\]{};':"|,.<>/?~]/gi, '');

      if (createdUser) {
        const { id: UserId } = createdUser;
        const createdTodo = {
          id: ToDo.length + 1,
          completed: false,
          userId: UserId,
          user: createdUser,
          title: preparedTitle,
        };

        setTodos((prevTodos) => {
          return [...prevTodos, createdTodo];
        });
        setTitle('');
        setUserId('');
      }
    }
  };

  return (
    <div className="App">
      <form className="field is-grouped">
        <input
          type="text"
          value={title}
          onChange={titleHandler}
          className="input"
          placeholder="Title ToDo"
        />
        {errorTitle !== '' && <span className="help">{errorTitle}</span>}
        <select
          value={name}
          onChange={nameHandler}
          name="selectName"
          className="select"
        >
          <option value="">Choose a user</option>
          {usersData.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
        {errorName !== '' && <span className="help">{errorName}</span>}
        <button
          type="submit"
          onClick={addTODO}
          className="button is-primary"
        >
          ADD
        </button>
      </form>
      <hr />
      <TodoList preparedTodos={ToDo} />
    </div>

  );
};

export default App;
