import React, { useState } from 'react';
import './App.scss';
import preparedTodos from './api/types/components/preparedTodos';
import { TodoList } from './api/types/components/TodoList/TodoList';
import users from './api/users';

const App: React.FC = () => {
  const [prepeadTodosActual, SetPrepeadTodosActual] = useState([...preparedTodos]);
  const [hasTitleError, SethasTitleError] = useState(false);
  const [hasUserError, SethasUserError] = useState(false);
  const [title, SetTitle] = useState('');
  const [userId, SetId] = useState('0');

  return (
    <div className="App">
      <h1 className="App__chapter">Adding new todo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          SethasTitleError(title.length === 0);
          SethasUserError(userId === '0');

          if (userId !== '0' && title.length !== 0) {
            SetPrepeadTodosActual(
              [...prepeadTodosActual, {
                id: +userId,
                title: `${title}`,
                completed: false,
                user: users.find(u => u.id === +userId) || null,
              }],
            );
            SetTitle('');
            SetId('0');
          }
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
            SetTitle(event.target.value);
            SethasTitleError(event.target.value.length === 0);
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
            SetId(event.target.value);
            SethasUserError(event.target.value === '0');
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
