import React, { FormEvent, useState } from 'react';
import './App.scss';

import users from '../../api/users';
import todosFromServer from '../../api/todos';
import { TodoList } from '../TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const isFormValid = () => {
    if (!user) {
      setIsUserValid(false);
    }

    if (!title.trim()) {
      setIsTitleValid(false);
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      const currentUser = users.find(({ name }) => name === user);

      const newTodo = {
        userId: currentUser ? currentUser.id : 0,
        id: todos.length + 1,
        title,
        completed: false,
      };

      setTodos((prevState) => [...prevState, newTodo]);

      setTitle('');
      setUser('');
    }
  };

  const handlerForTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setTitle(value.replace(/[^\wА-Яа-яёЁ ]/, ''));
    setIsTitleValid(true);
  };

  const handlerForUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUser(value);
    setIsUserValid(true);
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
            onChange={handlerForTitle}
          />
          {!isTitleValid && (
            <span className="form__span">
              Please enter the title!
            </span>
          )}
        </label>

        <label className="form__label">
          <select
            className="form__select"
            name="user"
            value={user}
            onChange={handlerForUser}
          >
            <option value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>
          {!isUserValid && (
            <span className="form__span">
              Please choose a user!
            </span>
          )}

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
