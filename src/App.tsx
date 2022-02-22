import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import users from './api/users';
import todos from './api/todos';
import './App.css';

const preparedTodos = [...todos].map((todo) => {
  const newUser = users.find(user => user.id === todo.userId) || null;

  if (newUser === null) {
    throw new Error('choose someone');
  }

  return {
    ...todo,
    person: newUser,
  };
});

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [todo, setTodo] = useState('');
  const [allTodos, setTodos] = useState(preparedTodos);

  const addNewTodo = () => {
    let selectedUser = users.find(user => name.includes(user.name)) || null;

    if (name === '' || todo === '') {
      // eslint-disable-next-line no-alert
      alert(todo.length ? 'Please, choose a user' : 'Please, add the title"');
    } else {
      if (selectedUser === null) {
        throw new Error();
      }

      const newTodo = {
        person: selectedUser,
        id: allTodos.length + 1,
        userId: selectedUser.id,
        title: todo,
        completed: false,
      };

      setTodo('');

      setTodos([...allTodos, newTodo]);
    }

    selectedUser = null;
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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
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
        {!name && <span>Please choose a user</span>}

        <input
          type="text"
          className="form__input"
          placeholder="What to do?"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        {!todo && <span>Please enter the title</span>}
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
