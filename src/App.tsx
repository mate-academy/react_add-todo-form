import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [todos, setToDos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [users, setUsers] = useState<User[]>(usersFromServer);
  const [newId, setNewId] = useState<number>(0);
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState<number>(0);
  const [newCompleted, setNewCompleted] = useState(false);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const addTodo = (todo: Todo) => {
    setToDos(prevTodo => [...prevTodo, todo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      setTitleError(true);
    }

    if (!newUserId) {
      setUserError(true);
    }

    if (!newTitle.trim() || !newUserId) {
      return;
    }

    setTitleError(false);
    setUserError(false);

    const newTodo: Todo = {
      id: todos.length + 1,
      title: newTitle.trim(),
      userId: newUserId,
      completed: false,
      user: users.find(user => user.id === newUserId)!,
    };

    addTodo(newTodo);

    setNewTitle('');
    setNewUserId(0);
    setNewCompleted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={e => {
              setNewTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newUserId}
            onChange={e => {
              setNewUserId(Number(e.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
