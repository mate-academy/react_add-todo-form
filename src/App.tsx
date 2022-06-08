import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Components/TodoList';
import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId) || null,
  }),
);

const App: React.FC = () => {
  const [allTodos, setTodos] = useState([...preparedTodos]);

  const [input, setInput] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isValidUser, setIsValidUser] = useState(false);

  const clearForm = () => {
    setInput('');
    setUserId(0);
  };

  const addTodos = () => {
    const newTodo = {
      userId,
      id: allTodos.length + 1,
      title: input,
      completed: false,
      user: users.find(user => userId === user.id) || null,
    };

    setTodos(current => [...current, newTodo]);
  };

  const validTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleValid(false);
    setInput(event.target.value);
  };

  const validUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsValidUser(false);
    setUserId(+event.target.value);
  };

  // eslint-disable-next-line max-len
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId && !input) {
      setIsTitleValid(true);
      setIsValidUser(true);

      return;
    }

    if (!input) {
      setIsTitleValid(true);

      return;
    }

    if (!userId) {
      setIsValidUser(true);

      return;
    }

    if (!isValidUser && !isTitleValid) {
      addTodos();
      clearForm();
    }
  };

  return (
    <div className="App">
      <form
        className="form"
        onSubmit={handleFormSubmit}
      >
        <input
          className="input is-primary"
          type="text"
          placeholder="Please, enter the title"
          value={input}
          onChange={validTitle}
        />
        {isTitleValid
      && (
        <span
          className="button is-danger is-inverted"
        >
          Please write a title
        </span>
      )}

        <div className="select is-primary">
          <select
            value={userId}
            onChange={validUser}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {isValidUser
          && (
            <span
              className="button is-danger is-inverted"
            >
              Choose a user
            </span>
          )}
        <button
          className="button is-primary is-outlined"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList preparedTodos={allTodos} />
    </div>
  );
};

export default App;
