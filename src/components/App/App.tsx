import React, { FormEvent, useState } from 'react';
import './App.scss';

import users from '../../api/users';
import todosFromServer from '../../api/todos';
import { TodoList } from '../TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorMessageForTitle, setErrorMessageForTitle] = useState('');
  const [errorMessageForUser, setErrorMessageForUser] = useState('');
  const [todos, setTodos] = useState(todosFromServer);

  const isFormValid = () => {
    switch (true) {
      case !title:
        setErrorMessageForTitle('Please enter the title!');

        return false;

      case !user:
        setErrorMessageForUser('Please choose a user!');

        return false;

      default:
        return true;
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let todoAdded = 0;

    if (isFormValid()) {
      const currentUser = users.find(({ name }) => name === user);

      const newTodo = {
        userId: currentUser ? currentUser.id : 0,
        id: todos.length + 1,
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      todoAdded += 1;

      if (todoAdded) {
        setTitle('');
        setUser('');
      }
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;

    setTitle(value.replace(/[^A-Za-zА-Яа-яёЁ0-9 ]/, ''));
    setErrorMessageForTitle('');
  };

  const updatedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId) || null,
  }));

  return (
    <div className="app">
      <h1 className="app__title">Add todo form</h1>

      <form
        className="form"
        onSubmit={submitForm}
      >
        <label className="form__label">
          <input
            className="form__input"
            type="text"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={onChange}
          />
          <span className="form__span">
            {errorMessageForTitle}
          </span>
        </label>

        <label className="form__label">
          <select
            className="form__select"
            name="user"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              setErrorMessageForUser('');
            }}
          >
            <option value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>{name}</option>
            ))}

          </select>
          <span className="form__span">
            {errorMessageForUser}
          </span>
        </label>

        <button
          className="form__button"
          type="submit"
        >
          Add
        </button>
      </form>

      <div>
        <TodoList todos={updatedTodos} />
      </div>
    </div>
  );
};

export default App;
