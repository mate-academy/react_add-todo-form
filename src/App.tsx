import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';
import './App.scss';

const Todos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userSelected, setUserSelected] = useState(0);
  const [currentToddos, setTodos] = useState(Todos);
  const [focus, setFocus] = useState(false);

  const TitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const UserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(+event.target.value);
  };

  const addTodo = () => {
    setFocus(true);

    if (title && userSelected !== 0) {
      setTodos(() => {
        const newTodo = {
          userId: userSelected,
          id: currentToddos[currentToddos.length - 1].id + 1,
          title,
          completed: false,
          user: users.find(user => user.id === userSelected) || null,
        };

        setTitle('');
        setUserSelected(0);
        setFocus(false);

        return [...currentToddos, newTodo];
      });
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <div className="App__form-field">
        <form onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        >
          <div className="App__input-wrapper">
            <input
              className="input App__input"
              placeholder="Write a title"
              data-cy="titleInput"
              type="text"
              value={title}
              onChange={TitleChange}
            />
          </div>

          {focus && !title && (
            <div className="App__error">Enter title</div>
          )}

          <div className="select">
            <select
              className="select App__select"
              name="users"
              data-cy="userSelected"
              value={userSelected}
              onChange={UserChange}
            >
              <option value="0">
                Choose user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {focus && !userSelected && (
            <div className="App__error">Choose user</div>
          )}

          <button className="button App__button" type="submit">
            Add
          </button>
        </form>
      </div>
      <TodoList Todos={currentToddos} />
    </div>
  );
};

export default App;
