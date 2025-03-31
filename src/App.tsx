import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [currentTodo, setNewTodo] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const todosWithUsers: [] = currentTodo.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userSelect) {
      setSelectError(true);
    }

    if (title && userSelect) {
      const newId = Math.max(...currentTodo.map(todo => todo.id)) + 1;
      const user = usersFromServer.find(us => us.email === userSelect);

      if (user) {
        const newTodo = {
          id: newId,
          title: title,
          completed: false,
          userId: user.id,
          user: user,
        };

        setNewTodo([...currentTodo, newTodo]);
      }

      setTitle('');
      setUserSelect('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            data-cy="titleInput"
            value={title}
            id="title"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            required
            data-cy="userSelect"
            value={userSelect}
            id="userSelect"
            onChange={event => {
              setUserSelect(event.target.value);
              setSelectError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.email}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
