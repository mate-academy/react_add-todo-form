import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import users from './api/users';
import todos from './api/todos';
import './App.css';

const preparedTodos = [...todos].map((todo) => {
  const newUser = users.find(user => user.id === todo.userId) || null;

  if (newUser === null) {
    throw new Error();
  }

  return {
    ...todo,
    person: newUser,
  };
});

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [allTodos, setTodos] = useState(preparedTodos);

  const addNewTodo = () => {
    const selectedUser = users.find(user => userName.includes(user.name)) || null;

    if (!selectedUser || !title) {
      // eslint-disable-next-line no-alert
      setUserName('');
    } else {
      if (selectedUser === null) {
        setUserName('');
      }

      const newTodo = {
        person: selectedUser,
        id: allTodos.length + 1,
        userId: selectedUser.id,
        title,
        completed: false,
      };

      setTitle('');
      setUserName('');
      setTodos([...allTodos, newTodo]);
    }
  };

  const setNewUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
  };

  const setNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action=""
        className="form"
        onSubmit={addNewTodo}
      >
        <div className="input">
          <select
            name="users names"
            className="form__selector"
            value={userName}
            onChange={setNewUserName}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}

          </select>
        </div>
        {!userName && <span className="error">Please choose a user</span>}

        <input
          type="text"
          className="form__input"
          placeholder="What to do?"
          value={title}
          onChange={setNewTitle}
        />
        {!title && <span className="error">Please enter the title</span>}
        <button
          type="button"
          className="form__button"
          onClick={addNewTodo}
        >
          add
        </button>
      </form>
      <TodoList defaultList={allTodos} />
    </div>
  );
};

export default App;
