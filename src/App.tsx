import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

const prepearedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUser] = useState('');
  const [todos, setTodoList] = useState([...prepearedTodos]);
  const [formInfo, setFormInfo] = useState('');

  const handleSubmit = () => {
    if (!userName) {
      setFormInfo('Please choose a user');
    }

    if (!title) {
      setFormInfo('Please enter the title');
    }

    if (title !== '' && userName !== '') {
      const currUser = users.find(user => user.name === userName) || null;

      const newTodo: Todo = {
        userId: currUser ? currUser.id : null,
        id: todos.length + 1,
        title,
        completed: false,
        user: currUser || null,
      };

      setTodoList([...todos, newTodo]);

      setTitle('');
      setUser('');
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          data-cy="titleInput"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setFormInfo('');
          }}
        />

        <select
          data-cy="userSelect"
          value={userName}
          onChange={(event) => {
            setUser(event.target.value);
            setFormInfo('');
          }}
        >
          <option value="" disabled>Choose a user</option>

          {users.map(currUser => (
            <option
              value={currUser.name}
              key={currUser.id}
            >
              {currUser.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="button is-link"
        >
          Add
        </button>

        <div className="form__info">
          {formInfo}
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
