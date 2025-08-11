import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todosList, setTodosList] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const maxId = Math.max(...todosList.map(todo => todo.id));

  const addHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setIsSubmitted(true);

      return;
    }

    const user = getUserById(+selectedUser);

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: user ? user.id : 0,
      user,
    };

    setTodosList(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUser('');
    setIsSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addHandler}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter your title"
            onChange={e => setTitle(e.target.value)}
          />
          {isSubmitted && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(item => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>

          {isSubmitted && !selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
