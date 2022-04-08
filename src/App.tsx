import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './type/Todo';

const todoData: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [todoss, setTodos] = useState(todoData);

  const createTodo = (newText: string, id: number): void => {
    const newTodo = {
      userId: id,
      id: todoData.length + 1,
      title: newText,
      completed: false,
      user: users.find(user => user.id === id) || null,
    };

    setTodos(
      [...todoss, newTodo],
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.split('').filter(sumbol => sumbol.toLowerCase() !== sumbol.toUpperCase() || sumbol === ' ' || '0123456789'.includes(sumbol)).join('');

    setText(newValue);
    setErrorTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userSelect === '') {
      setErrorName('Please choose a user');
    }

    if (text === '') {
      setErrorTitle('Please enter the title');
    }

    if (userSelect === '' || text === '') {
      return;
    }

    createTodo(text, +userSelect);

    setText('');
  };

  return (
    <div className="App">

      <h1 className="App__title">Add todo form</h1>

      <p className="App__subtitle">
        <span>Users: </span>
        {users.length}
      </p>

      <form onSubmit={(event) => {
        handleSubmit(event);
      }}
      >
        <select
          className="App__input"
          value={userSelect}
          onChange={(event) => {
            setUserSelect(event.target.value);
            setErrorName('');
          }}
        >
          <option value="">Select user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <p className="App__error">{errorName}</p>

        <input
          className="App__input"
          type="text"
          name="todo"
          placeholder="Todo..."
          value={text}
          onChange={(event) => {
            handleChange(event);
          }}
        />

        <p className="App__error">{errorTitle}</p>

        <br />

        <button className="App__btn" type="submit">
          Add todo
        </button>
      </form>

      <TodoList data={todoss} />
    </div>
  );
};

export default App;
