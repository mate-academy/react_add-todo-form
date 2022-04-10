import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const userTodo = users.map(user => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
});

const preparedTodos = todos.map(todo => {
  return {
    userId: todo.userId,
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: userTodo.find(user => user.id === todo.userId),
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todo, setTodo] = useState(preparedTodos);
  const [titleError, setTitleError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTitle(input.replace(/[^A-Za-zА-Яа-яЁё0-9\s]/ig, ''));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
  };

  const resetForm = () => {
    if (title && userName) {
      setTitle('');
      setUserName('');
    }
  };

  const validation = () => {
    if (!title) {
      setTitleError('Please enter the title');
    } else {
      setTitleError('');
    }

    if (!userName) {
      setUserNameError('Please choose a user');
    } else {
      setUserNameError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newUser = userTodo.find(user => user.name === userName) || undefined;

    if (title.length !== 0 && userName.length !== 0) {
      const newTodo = {
        userId: 0,
        id: Math.max(...todos.map(tod => tod.userId)) + 1,
        title,
        completed: false,
        user: newUser,
      };

      setTodo([...todo, newTodo]);
    }

    validation();
    resetForm();
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="form__part">
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            className="form__line"
            placeholder="title"
            value={title}
            onChange={handleTitleChange}
          />
          {(!title) && <p className="form__error">{titleError}</p>}
        </div>
        <div className="form__part">
          <h3>Name</h3>
          <select
            name="userName"
            className="form__line"
            value={userName}
            onChange={handleUserChange}
          >
            <option value="">
              Choose a color
            </option>
            {users.map((user) => {
              return <option key={user.id}>{user.name}</option>;
            })}
          </select>
          {(!userName) && <p className="form__error">{userNameError}</p>}
        </div>

        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
      <TodoList preparedTodos={todo} />
    </div>
  );
};

export default App;
