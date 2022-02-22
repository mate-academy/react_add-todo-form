import React, { useState } from 'react';
import './App.scss';
import preparedTodos from './api/types/components/preparedTodos';
import { TodoList } from './api/types/components/TodoList/TodoList';
import users from './api/users';

const App: React.FC = () => {
  const [prepeadTodosActual, SetPrepeadTodosActual] = useState([...preparedTodos]);
  const [nameSelected, SetName] = useState('');
  const [newTodo, SetNewDo] = useState({ title: '', completed: false, user: users.find(u => u.name === nameSelected) || null });

  return (
    <div className="App">
      <h1 className="App__chapter">Adding new todo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          SetPrepeadTodosActual([...prepeadTodosActual, newTodo]);
          SetNewDo({ ...newTodo, title: '' });
        }}
        className="App__form"
      >
        <input
          required
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            SetNewDo({ ...newTodo, title: event.target.value });
          }}
        />
        <select
          required
          name="name"
          id="user"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            SetName(event.target.value);
            SetNewDo({ ...newTodo, user: users.find(u => u.name === event.target.value) || null });
          }}
        >
          <option value="Choose your person">Choose your person</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">
          Add
        </button>
      </form>
      <TodoList todos={prepeadTodosActual} />
    </div>
  );
};

export default App;
