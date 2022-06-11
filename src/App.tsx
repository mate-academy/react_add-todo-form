import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './Types/todo';

export const preparedTodos: Todo[] = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }
));

const App: React.FC = () => {
  const [todo, setTodo] = useState([...preparedTodos]);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserId, setErrorUserId] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle === '') {
      setErrorTitle(true);
    }

    if (userId === 0) {
      setErrorUserId(true);
    }

    if (todoTitle !== '' && userId !== 0) {
      const newItem = {
        userId,
        id: todo.length + 1,
        title: todoTitle,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      setTodo([...todo, newItem]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  const newUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setErrorUserId(false);
  };

  const newTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setErrorTitle(false);
  };

  return (
    <div className="App">
      <TodoList todos={todo} />

      <aside className="sidebar">
        <form onSubmit={e => handleSubmit(e)} className="sidebar__form">
          <input
            type="text"
            placeholder="Title"
            value={todoTitle}
            onChange={newTitle}
            className="sidebar__input"
          />
          {errorTitle && (
            <span className="input-error">
              Please enter the title
            </span>
          )}
          <select
            value={userId}
            onChange={newUserId}
            className="sidebar__select"
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {errorUserId && (
            <span className="select-error">
              Please choose a user
            </span>
          )}
          <button type="submit" className="button">Add</button>
        </form>
      </aside>
    </div>
  );
};

export default App;
