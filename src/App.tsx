import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

export const App = () => {
  const enrichedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || {
      id: 0,
      name: 'Unknown',
      username: '',
      email: '',
    },
  }));

  const [todos, setTodos] = useState(enrichedTodos);
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(+e.target.value);
    setSelectError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors = 0;

    if (!title) {
      setTitleError(true);
      errors++;
    }

    if (!selected) {
      setSelectError(true);
      errors++;
    }

    if (errors > 0) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
    const selectedUser = usersFromServer.find(user => user.id === selected);

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: newId,
      title,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelected(0);
    setSelectError(false);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleInputChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            value={selected}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
