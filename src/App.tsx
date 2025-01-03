import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types';
import { User } from './types';


const normalizeTodos = (todos: Todo[], users: User[]): (Todo & { user: User })[] => {
  return todos.map(todo => {
    const user = users.find(u => u.id === todo.userId) || {
      id: 0,
      name: 'Unknown User',
      username: 'unknown',
      email: 'unknown@example.com',
    };
    return { ...todo, user };
  });
};



export const App = () => {

  const [todos, setTodos] = useState(normalizeTodos(todosFromServer, usersFromServer));

  const [text, setText] = useState('');
  const [user, setUser] = useState('0');

  const [textError, setTextError] = useState(false);
  const [userError, setUserError] = useState(false);

  function checkSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTextError(false);
    setUserError(false);

    let hasError = false;
    if (!text || text === '') {
      setTextError(true);
      hasError = true;
    }

    if (!user || user === '0') {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newUser = 
    usersFromServer.find(u => u.id === Number(user)) || {
      id: 0,
      name: 'Unknown User',
      username: 'unknown',
      email: 'unknown@example.com',
    };

    const biggestID = todos.length >= 1 ? Math.max(...todos.map(el => el.id)) : 1;

    const newTodo: Todo & { user: User } = {
      id: biggestID + 1,
      title: text,
      completed: false,
      userId: Number(user),
      user: newUser,
    };

    setTodos([...todos, newTodo]);
    setText('');
    setUser('0');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={checkSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={text}
            onChange={e => {setText(e.target.value), setTextError(false)}}
          />
          {textError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={e => {setUser(e.target.value), setUserError(false)}}
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

      {/* Передаємо вже нормалізовані todos */}
      <TodoList todos={todos} />
    </div>
  );
};
