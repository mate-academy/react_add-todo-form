import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import initialTodos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = initialTodos.map(todo => ({
  ...todo,
  user: users.find(
    user => user.id === todo.userId,
  ) || null,
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isUserInvalid, setIsUserInvalid] = useState(false);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleInvalid(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserInvalid(false);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    const newTodos = todos.map(todo => {
      if (todo.id === +id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsUserInvalid(userName === '');
    setIsTitleInvalid(title === '');

    if (userName === '' || title === '') {
      return;
    }

    const newUser = users.find(user => user.name === userName) || null;
    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo = {
      userId,
      id: todos.length + 1,
      title,
      completed: false,
      user: newUser,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList
        todos={todos}
        handleCheckbox={handleCheckbox}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={handleTitleChange}
        />
        {isTitleInvalid && 'Please enter the title'}

        <div />

        <select
          value={userName}
          onChange={handleOptionChange}
        >
          <option value="">
            Choose a user
          </option>

          {users.map(user => {
            const { name, id } = user;

            return (
              <option
                value={name}
                key={id}
              >
                {name}
              </option>
            );
          })}
        </select>
        {isUserInvalid && 'Please choose a user'}

        <div />

        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
