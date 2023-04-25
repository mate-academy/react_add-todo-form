import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [userIsntSelected, setUserIsntSelected] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setIsTitleEmpty(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(getUserById(+event.target.value));
    setUserIsntSelected(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      setUserIsntSelected(true);
    }

    if (!title.trim()) {
      setIsTitleEmpty(true);
    }

    if (title.trim() && selectedUser) {
      const newTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

      const newTodo = {
        id: newTodoId,
        userId: selectedUser ? selectedUser.id : -1,
        title,
        completed: false,
        user: selectedUser,
      };

      setVisibleTodos([
        ...visibleTodos,
        newTodo,
      ]);

      setSelectedUser(null);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {isTitleEmpty && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              value={selectedUser?.id || 0}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {userIsntSelected && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <h1 className="App__title">Static list of todos</h1>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
