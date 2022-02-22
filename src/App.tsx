import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import initialTodos from './api/todos';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [isUserInvalid, setIsUserInvalid] = useState(false);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(
      user => user.id === todo.userId,
    ) || null,
  }));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleInvalid(false);
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
    setIsUserInvalid(true);
    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const select = form.elements[1] as HTMLSelectElement;
    const newUserName = select.value;
    const newTitle = input.value;

    setIsUserInvalid(newUserName === '');
    setIsTitleInvalid(newTitle === '');

    if (newUserName === '' || newTitle === '') {
      return;
    }

    const newUser = users.find(user => user.name === newUserName);
    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo = {
      userId,
      id: todos.length + 1,
      title: newTitle,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList
        todos={preparedTodos}
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

        <select>
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
