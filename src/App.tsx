import React, { useState } from 'react';
import TodoList from './Components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

import './App.scss';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const preparedTodos = todos.map(todo => {
    return {
      ...todo,
      user: users.find(elementUser => elementUser.id === todo.userId) || null,
    };
  });

  const [prepareTodos, setPrepareTodo] = useState(preparedTodos);

  const addNewTodo = () => {
    const newTodo = {
      userId,
      id: todos.length + 1,
      title,
      completed: false,
      user: users.find(elementUser => elementUser.id === userId) || null,
    };

    todos.push(newTodo);

    setPrepareTodo([...prepareTodos, newTodo]);
    setUserId(0);
    setTitle('');
  };

  return (
    <div className="App">
      <div className="app__container">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (title === '') {
              setTitleError(true);
            }

            if (userId === 0) {
              setUserIdError(true);
            }

            if (title !== '' && userId !== 0) {
              addNewTodo();
            }

            setTitle('');
            setUserId(0);
          }}
        >
          <div className="app__input input">
            <input
              className="input__field"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
            {titleError && (
              <span className="input__error">
                Please enter the title
              </span>
            )}
          </div>

          <div className="app__selector selector">
            <select
              className="selector__field"
              value={userId}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setUserId(Number(event.target.value));
                setUserIdError(false);
              }}
            >
              <option value={0}>Choose a user</option>
              {users.map((el) => (
                <option value={el.id} key={el.id}>{el.name}</option>
              ))}
            </select>
            {userIdError && (
              <span className="selector__error">
                Please choose a user
              </span>
            )}
          </div>

          <button type="submit" className="app__button button">Add</button>
        </form>
      </div>

      <TodoList todos={prepareTodos} />

    </div>
  );
};

export default App;
