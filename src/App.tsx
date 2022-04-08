import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './type/Todo';

let todoData: Todo[] = todos.map(todo => {
  return {
    ...todo,
    userLink: users.find(user => user.id === todo.userId),
  };
});

const createTodo = (text: string, id: number) => {
  const newTodo = {
    userId: id,
    id: todoData.length + 1,
    title: text,
    completed: false,
    userLink: users.find(user => user.id === id),
  };

  todoData = [
    ...todoData,
    newTodo,
  ];
};

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  return (
    <div className="App">

      <h1 className="App__title">Add todo form</h1>

      <p className="App__subtitle">
        <span>Users: </span>
        {users.length}
      </p>

      <form onSubmit={(event) => {
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
            const newValue = event.target.value.split('').filter(sumbol => sumbol.toLowerCase() !== sumbol.toUpperCase() || sumbol === ' ' || '0123456789'.includes(sumbol)).join('');

            setText(newValue);
            setErrorTitle('');
          }}
        />

        <p className="App__error">{errorTitle}</p>

        <br />

        <button className="App__btn" type="submit">
          Add todo
        </button>
      </form>

      <TodoList data={todoData} />
    </div>
  );
};

export default App;
