import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/types';

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todosWithUsers);
  const [selectedUser, setSelectedUser] = useState<string>('0');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hasTitleError = !title;
    const hasUserError = selectedUser === '0';

    if (hasTitleError) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (hasUserError) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    if (!hasTitleError && !hasUserError) {
      setTitle('');
      setSelectedUser('0');
    } else {
      return;
    }

    const maxId = newTodos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      newTodos[0].id,
    );

    const selectedUserObject = usersFromServer.find(
      user => user.id === +selectedUser,
    );

    if (selectedUserObject) {
      const newTodo = {
        id: maxId + 1,
        title: title,
        completed: false,
        user: selectedUserObject,
      };

      setNewTodos(currentTodos => [...currentTodos, newTodo]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    if (event.target.value !== '0') {
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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

      <section className="TodoList">
        <TodoList todos={newTodos} />
      </section>
    </div>
  );
};
