import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const preparedUsers = users.map(user => {
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
    user: preparedUsers.find(user => user.id === todo.userId),
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todosList, setTodosList] = useState(preparedTodos);
  const [titleError, setTitleError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTitle(input.replace(/[^A-Za-zА-Яа-яЁё0-9\s]/ig, ''));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
  };

  const validation = () => {
    if (!title || !userName) {
      setTitleError('Please enter the title');
      setUserNameError('Please enter the userName');

      return false;
    }

    return title || userName;
  };

  const resetForm = () => {
    setTitle('');
    setUserName('');
    setTitleError('');
    setUserNameError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedUser = preparedUsers.find(user => user.name === userName);

    if (validation()) {
      const newTodo = {
        userId: 0,
        id: Math.max(...todosList.map(tod => tod.id)) + 1,
        title,
        completed: false,
        user: selectedUser,
      };

      setTodosList([...todosList, newTodo]);
      resetForm();
    }
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
          {!title
            && (
              <p className="form__error">
                {titleError}
              </p>
            )}
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
              Choose a name
            </option>
            {users.map((user) => (
              <option
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!userName
            && (
              <p className="form__error">
                {userNameError}
              </p>
            )}
        </div>
        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
      <TodoList preparedTodos={todosList} />
    </div>
  );
};

export default App;
