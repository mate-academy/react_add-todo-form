import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todosFronServer from './api/todos';

const preparedTodos = todosFronServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isTitleEntered, setIsTitleEntered] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleEntered(true);
    }

    if (!userId) {
      setIsUserSelected(true);
    }

    if (title && userId) {
      const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

      const newTodo = {
        userId: +userId,
        id: maxId,
        title,
        completed: false,
        user: users.find(user => user.id === +userId) || null,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId('');
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntered(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setIsUserSelected(false);
  };

  return (
    <div className="App">
      <h1>Todos form</h1>

      <form
        action="get"
        onSubmit={handleSubmit}
      >
        <section>
          <input
            type="text"
            placeholder="Enter your todo"
            value={title}
            onChange={handleChangeTitle}
          />
          {isTitleEntered && (
            <span style={{ color: 'red' }}>
              Please enter the title
            </span>
          )}
        </section>
        <br />
        <section>
          <select
            name="user"
            value={userId}
            onChange={handleSelect}
          >
            <option>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserSelected && (
            <span style={{ color: 'red' }}>
              Please choose a user
            </span>
          )}
        </section>
        <br />
        <button
          type="submit"
        >
          Add ToDo
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
