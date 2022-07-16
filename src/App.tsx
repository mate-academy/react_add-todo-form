import React, { useState } from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [currToddos, setTodos] = useState(preparedTodos);
  const [click, setClick] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(Number(event.target.value));
  };

  const addTodo = () => {
    const valid = () => (
      userSelect !== 0 && title !== ''
    );

    setClick(!click);

    if (valid()) {
      setTodos(() => {
        const newTodo = {
          userId: userSelect,
          id: currToddos.length + 1,
          title,
          completed: false,
          user: users.find(user => user.id === userSelect) || null,
        };

        setTitle('');
        setUserSelect(0);

        return [...currToddos, newTodo];
      });
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <div className="App__form-field">
        <input
          className="input is-rounded App__input"
          type="text"
          data-cy="titleInput"
          placeholder="Write a title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="select is-rounded">
          <select
            className="select is-rounded App__select"
            name="users"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleUserChange}
          >
            <option
              value="0"
            >
              Choose user
            </option>
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
      </div>

      {click && !title && (
        <div className="App__error">Please, enter the title</div>
      )}

      {click && !userSelect && (
        <div className="App__error">Please, choose user</div>
      )}

      <button
        className="button is-rounded is-success App__button"
        type="button"
        onClick={addTodo}
      >
        Add
      </button>

      <TodoList preparedTodos={currToddos} />
    </div>
  );
};

export default App;
