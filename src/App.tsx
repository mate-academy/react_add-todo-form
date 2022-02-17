/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList';
import todos from './api/todos';

const todosWithPersons = [...todos].map((todo) => {
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
  const [allTodos, setTodos] = useState(todosWithPersons);

  const addNewTodo = () => {
    const needUser = users.find(user => name.includes(user.name)) || null;

    if (name === '' || todo === '') {
      // eslint-disable-next-line no-alert
      alert(todo.length ? 'Please choose a user' : 'Please add what to do');
    } else {
      if (needUser === null) {
        throw new Error();
      }

      const newTodo = {
        person: needUser,
        id: allTodos.length * needUser.id,
        userId: needUser.id,
        title: todo,
        completed: false,
      };

      setTodo('');

      setTodos([...allTodos, newTodo]);
    }
  };

  return (
    <div className="App">
      <h2>Add todo form:</h2>
      <form
        action=""
        className="form"
      >
        <div className="input-field col s12">
          <select
            name="users names"
            className="browser-default"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
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
        <input
          type="text"
          placeholder="What to do?"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);

            console.log(todo);
          }}
        />

        <button
          type="button"
          className="waves-effect cyan btn"
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
