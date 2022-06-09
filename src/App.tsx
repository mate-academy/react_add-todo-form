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
  const [titleLength, setTitleLength] = useState(false);

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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.length > 30) {
      setTitleLength(!titleLength);

      return;
    }

    setIsTitleValid(!input);
    setIsValidUser(!userId);
    setTitleLength(false);

    if (input && userId) {
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
          Please, write a title
        </span>
      )}
        {titleLength
        && (
          <span
            className="button is-danger is-inverted"
          >
            Please, enter the shorter title :)
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
