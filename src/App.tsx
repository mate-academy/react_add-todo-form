import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return {
    ...todo,
    user: user || {
      id: 0,
      name: 'Unknown',
      username: 'Unknown',
      email: 'unknown@example.com',
    },
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('0');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasErrors = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasErrors = true;
    }

    if (userId === '0') {
      setUserError('Please choose a user');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const selectedUser = usersFromServer.find(user => user.id === +userId);
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: +userId,
      user: selectedUser!,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              const filteredValue = event.target.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g,
                '',
              );

              setTitle(filteredValue);
              if (filteredValue.trim() !== '') {
                setTitleError(null);
              }
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              if (event.target.value !== '0') {
                setUserError(null);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
