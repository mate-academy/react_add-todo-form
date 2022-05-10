import React, { useState } from 'react';
import './App.scss';
import preparedTodos from './api/types/components/preparedTodos';
import { TodoList } from './api/types/components/TodoList/TodoList';
import users from './api/users';

const App: React.FC = () => {
  const [prepeadTodosActual, setPrepeadTodosActual] = useState([...preparedTodos]);
  const [hasTitleError, sethasTitleError] = useState(false);
  const [hasUserError, sethasUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setId] = useState(0);

  const successfulSubmit = () => {
    if (userId !== 0 && title.length !== 0) {
      setPrepeadTodosActual(
        [...prepeadTodosActual, {
          id: userId,
          title,
          completed: false,
          user: users.find(u => u.id === +userId) || null,
        }],
      );
      setTitle('');
      setId(0);
    }
  };

  return (
    <div className="App">
      <h1 className="App__chapter">Adding new todo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sethasTitleError(title.length === 0);
          sethasUserError(userId === 0);
          successfulSubmit();
        }}
        className="App__form"
      >
        {hasTitleError && (
          <span className="App__error">
            Please enter the title
          </span>
        )}
        <input
          type="text"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
            sethasTitleError(false);
          }}
        />
        {hasUserError && (
          <span className="App__error">
            Please choose a user
          </span>
        )}
        <select
          value={userId}
          name="name"
          id="user"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setId(+event.target.value);
            sethasUserError(false);
          }}
        >
          <option value="0">Choose your person</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="App__button"
        >
          Add
        </button>
      </form>
      <TodoList todos={prepeadTodosActual} />
    </div>
  );
};

export default App;
