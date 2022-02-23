import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList';
import todos from './api/todos';

const preparedTodos = [...todos].map((todo) => {
  const newUser = users.find(user => user.id === todo.userId);

  if (!newUser) {
    throw new Error('Add')
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
  const [errorDirtyTodo, setErrorDirtyTodo] = useState(false);

  const addNewTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const selectedUser = users.find(user => name.includes(user.name));

    if (selectedUser === undefined) {
      return
    }

    const regex = (/[a-zА-Я0-9 ]/gi);

    if (!todo.match(regex) || todo === '') {
      setErrorDirtyTodo(true)
      return
    }

    const newTodo = {
      person: selectedUser,
      id: allTodos.length + 1,
      userId: selectedUser.id,
      title: todo,
      completed: false,
    };

    setTodo('');
    setName('');
    setTodos([...allTodos, newTodo]);
  }

  return (
    <div className="App">
      <h2>Add todo form:</h2>
      <form
        action=""
        className="form"
        onSubmit={event => addNewTodo(event)}
      >
        <div className="input-field col s12">
          <select
            name="users names"
            className="browser-default"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          >
            <option value="">Choose your person</option>
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

        <div className='container__input'>
          <input
            type="text"
            placeholder="What to do?"
            value={todo}
            onChange={(event) => {
              setTodo(event.target.value)
              setErrorDirtyTodo(false)}}
          />
          <p className={errorDirtyTodo ? "visible" : "invisible"}>add correct todo! (only `ru`, `en`, digits and spaces)</p>
        </div>
        <button
          type="submit"
          className="waves-effect cyan btn"
        >
          add
        </button>
      </form>
      <TodoList defaultList={allTodos} />
    </div>
  );
};

export default App;
