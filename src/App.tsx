import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [todoTitle, newTitle] = useState('');
  const [userName, newUser] = useState('');
  const [todoList, newTodo] = useState(todos);
  const [noUser, userError] = useState('Choose a user');

  const addTodo = () => {
    const user = users.find((person) => (userName === person.username));

    if (user !== undefined && todoTitle !== '') {
      newTodo([...todoList, {
        userId: user.id,
        id: todoList[todoList.length - 1].id + 1,
        title: todoTitle,
        completed: false,
      }]);
      newTitle('');
      newUser('');
    } else if (todoTitle === '') {
      newTitle('Please enter the title');
    } else {
      userError('Please choose a user');
    }
  };

  const handleChange = (event:
  { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    if (name === 'newTitle') {
      newTitle(value);
    } else if (name === 'newUser') {
      newUser(value);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <input
        type="text"
        name="newTitle"
        placeholder="Type new todo"
        value={todoTitle}
        onChange={handleChange}
      />
      <select
        name="newUser"
        id="select-user"
        value={userName}
        onChange={handleChange}
      >
        <option value="">
          {noUser}
        </option>

        {users.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => addTodo()}
      >
        Add Todo
      </button>
      <TodoList todos={todoList} />
    </div>
  );
};

export default App;
