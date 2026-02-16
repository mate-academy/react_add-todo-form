import './App.scss';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(currentUser => currentUser.id === todo.userId)!;

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim().length > 0;
    const hasUser = selectedUserId !== 0;

    setTitleError(!hasTitle);
    setUserError(!hasUser);

    if (!hasTitle || !hasUser) {
      return;
    }

    const user = usersFromServer.find(currentUser => currentUser.id === selectedUserId);

    if (!user) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);

              if (titleError) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));

              if (userError) {
                setUserError(false);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
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
