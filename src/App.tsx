import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import Todo from './types/Todo';
import User from './types/User';

const users:User[] = [...usersFromServer];
const todosWithUser:Todo[] = [...todosFromServer].map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId),
}));
const getMaxId = (todos: Todo[]) => Math.max(...todos.map((todo) => todo.id));

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(todosWithUser);
  const [afterSubmit, setAfterSubmit] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAfterSubmit(true);
    if (!selectedUser || !newTitle) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getMaxId(todos) + 1,
        title: newTitle,
        completed: false,
        userId: selectedUser,
        user: users.find((user) => user.id === selectedUser),
      },
    ]);
    setSelectedUser(0);
    setNewTitle('');
    setAfterSubmit(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder=""
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          {afterSubmit && !newTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(+event.target.value)}
            required
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {afterSubmit && !selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
