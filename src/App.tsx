import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './api/components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const preparedTodos = todos.map(todo => {
    const userIndex = users.findIndex(user => user.id === todo.userId);

    const todoList = {
      ...todo,
      user: userIndex !== -1 ? users[userIndex] : null,
    };

    return todoList;
  });

  const [title, setTitle] = useState('');
  const [userId, setUserID] = useState(0);
  const [completed] = useState(false);
  const [id, setId] = useState(0);
  const [newTodosList, setNewTodosList] = useState(preparedTodos);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const addTodo = () => {
    if (userId === 0) {
      setUserError(true);
    }

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId !== 0 && title.trim() !== '') {
      const newTodoItem = {
        id,
        title,
        userId,
        completed,
        user: users.find((user => user.id === userId)) || null,
      };

      setNewTodosList([...newTodosList, newTodoItem]);
      setUserID(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <div className="App__content">
        <form
          className="App__form"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <label className="App__title-block" htmlFor="title">
            Title:
            <input
              className="App__title-input"
              type="text"
              id="title"
              value={title}
              onChange={(event) => {
                return (
                  setTitle(event.target.value.replace(/[^a-zA-Zа-я0-9]/g, '')),
                  setTitleError(false)
                );
              }}
            />
          </label>

          <select
            className="App__select"
            name="addUser"
            value={userId}
            onChange={(event) => {
              return (
                setUserID(+event.target.value),
                setId(newTodosList.length + 1),
                setUserError(false)
              );
            }}
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
          {userError && (
            <div className="App__error App__error--user">
              Please choose a user
            </div>
          )}
          {titleError && (
            <div className="App__error App__error--title">
              Please enter the title
            </div>
          )}

          <button
            className="App__button"
            type="submit"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </form>

        <TodoList preparedTodos={newTodosList} />
      </div>

    </div>
  );
};

export default App;
