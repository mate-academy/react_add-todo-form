import React, { FormEvent, useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [visibleList, setVisibleList] = useState([...preparedTodos]);

  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('not completed');

  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const foundUser = users.find(currUser => currUser.name === user);
  const addNewTodo = () => {
    const newTodo = {
      userId: foundUser?.id,
      id: visibleList.length + 1,
      title,
      completed: status === 'completed',
      user: foundUser,
    };

    setVisibleList([
      ...visibleList,
      newTodo,
    ]);
  };

  const formValidate = () => {
    if (user === '') {
      setIsUserError(true);
    }

    if (title.trim() === '') {
      setIsTitleError(true);
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValidate()) {
      addNewTodo();
      setTitle('');
      setUser('');
      setStatus('not completed');
      setIsUserError(false);
      setIsTitleError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        className="form"
        onSubmit={submitForm}
      >
        <label className="form__element">
          Title:
          <input
            type="text"
            name="title"
            value={title.match(/[A-Za-zА-Яа-я0-9 ]/g)?.join('') || ''}
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError
            && <span className="error">Please enter the title</span>}
        </label>
        <label className="form__element">
          User:
          <select
            name="user"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              setIsUserError(false);
            }}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(currUser => (
              <option
                value={currUser.name}
                key={currUser.id}
              >
                {currUser.name}
              </option>
            ))}
          </select>
          {isUserError && <span className="error">Please choose a user</span>}
        </label>
        <div className="form__element">
          <label>
            Completed
            <input
              type="radio"
              name="status"
              value="completed"
              checked={status === 'completed'}
              onChange={(event) => setStatus(event.target.value)}
            />
          </label>
          <label>
            Not completed
            <input
              type="radio"
              name="status"
              value="not completed"
              checked={status === 'not completed'}
              onChange={(event) => setStatus(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">
          Add
        </button>
      </form>
      <div>
        <h2>Todos: </h2>
        <TodoList
          todos={visibleList}
        />
      </div>
    </div>
  );
};

export default App;
