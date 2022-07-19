import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [person, setPerson] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
  const [userId, setUserId] = useState(0);
  const [copyList, setCopyList] = useState([...preparedTodos]);

  const addTodo = () => {
    const newUser = users.find(user => user.name === person) || null;

    if (newUser) {
      setUserId(newUser.id);
    }

    setIsUser(!person);
    setIsTodo(!todo);

    if (!todo || !person) {
      return;
    }

    const length = copyList[copyList.length - 1].id + 1;

    const newTodo = {
      id: length,
      title: todo,
      userId,
      completed: false,
      user: newUser,
    };

    setCopyList(prevCopyList => [...prevCopyList, newTodo]);
    setTodo('');
    setPerson('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        className="forrm"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            name="todo"
            type="text"
            value={todo}
            placeholder="Enter a new todo"
            data-cy="titleInput"
            onChange={(event) => {
              setIsTodo(false);
              setTodo(event.target.value);
            }}
          />
          {isTodo && (
            <span className="error">Please enter the title</span>
          )}
        </div>

        <div className="field">
          <select
            name="users"
            data-cy="userSelect"
            value={person}
            onChange={(event) => {
              setIsUser(false);
              setPerson(event.target.value);
            }}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todos={copyList} />
    </div>
  );
};

export default App;
