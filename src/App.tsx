import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [userName, setUserName] = useState('');
  const [isUser, setIsUser] = useState(true);
  const [copyTodos, setTodos] = useState(preparedTodos);
  const [isCorrectTitle, setisCorrectTitle] = useState(true);

  const handleTitle = (value: string) => {
    if (value.match(/[^\s\dA-ZА-Я.]/gi)) {
      setisCorrectTitle(false);
    } else {
      setTitle(value);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      setIsTitle(false);

      return;
    }

    if (!userName) {
      setIsUser(false);

      return;
    }

    const user = users.find(person => person.name === userName) || null;
    const id = Math.max(...copyTodos.map(todo => (
      todo.id
    ))) + 1;
    const newTodo = {
      userId: user ? user.id : 0,
      id,
      title,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="fieldSection">
          <input
            type="text"
            placeholder="Title"
            data-cy="titleInput"
            className="field"
            value={title}
            onChange={(event) => {
              setisCorrectTitle(true);
              handleTitle(event.target.value);
              setIsTitle(true);
            }}
          />

          {!isTitle && (
            <span className="error">Please enter a title</span>
          )}
          {!isCorrectTitle && (
            <span className="error">Please enter valid symbols</span>
          )}
        </div>

        <div className="fieldSection">
          <select
            name="user"
            data-cy="userSelect"
            className="field"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
              setIsUser(true);
            }}
          >
            <option
              value="Choose a user"
            >
              Choose a user
            </option>

            {users.map(person => {
              return (
                <option
                  key={person.id}
                  value={person.name}
                >
                  {person.name}
                </option>
              );
            })}
          </select>

          {!isUser && (
            <span className="error">Please enter the user</span>
          )}
        </div>

        <button
          type="submit"
          className="button"
        >
          Add todo
        </button>
      </form>

      <TodoList todos={copyTodos} />
    </div>
  );
};

export default App;
