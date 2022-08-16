import { useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isNewTodoError, setIsNewTodoError] = useState(false);

  const getUser = (userId: number) => {
    return usersFromServer.find(user => user.id === userId) || null;
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUser === '0' || newTodoTitle === '') {
      setIsNewTodoError(true);

      return;
    }

    const maxID = Math.max(...todos.map(todo => Number(todo.id)));
    const newTodo = {
      id: maxID + 1,
      title: newTodoTitle,
      completed: false,
      userId: +selectedUser,
      user: usersFromServer.find(user => user.id === +selectedUser) || null,
    };

    setTodos(prevTodo => [...prevTodo, newTodo]);
    setSelectedUser('0');
    setNewTodoTitle('');
    setIsNewTodoError(false);
  };

  useEffect(() => {
    setTodos(todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })));
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => addTodo(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              type="text"
              id="titleInput"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={newTodoTitle}
              onChange={((event) => setNewTodoTitle(event.target.value))}
              onBlur={() => setNewTodoTitle(state => state.trim())}
              // required
            />
          </label>
          {newTodoTitle === ''
            && isNewTodoError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <select
              data-cy="userSelect"
              id="userSelect"
              value={selectedUser}
              onChange={(event) => setSelectedUser(event.target.value)}
            >
              <option
                value="0"
                disabled
                selected
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectedUser === '0'
            && isNewTodoError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
