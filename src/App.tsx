import './App.scss';
import { useState, useEffect } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [showUserError, setShowUserError] = useState<boolean>(false);
  const [showTitleError, setShowTitleError] = useState<boolean>(false);

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    setShowUserError(false);
  }, [selectedUserId]);

  useEffect(() => {
    setShowTitleError(false);
  }, [title]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const largestID = Math.max(...todos.map(todo => todo.id));
    const selectedUser = users.find(user => user.id === Number(selectedUserId));

    if (!selectedUser) {
      setShowUserError(true);
    }

    if (!title) {
      setShowTitleError(true);
    }

    if (selectedUser && title) {
      const newTodo = {
        id: largestID + 1,
        title: title,
        userId: selectedUser?.id,
        completed: false,
        user: selectedUser,
      };

      setTodos(oldTodos => [...oldTodos, newTodo]);
      setShowUserError(false);
      setShowTitleError(false);
      setTitle('');
      setSelectedUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={event => addTodo(event)}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter Title"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value.replace(/[^a-zA-Z]\s/g, ''))}
          />

          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
