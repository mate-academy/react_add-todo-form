import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User, Todo } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [validSubmit, setValidSubmit] = useState(false);
  const [currTodos, setCurrTodos] = useState(todos);
  const [userId, setUserId] = useState(0);

  const getNewTodoID = (dodos: Todo[]) => {
    return Math.max(...dodos.map(todo => todo.id)) + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !title.trim()) {
      setValidSubmit(true);
    } else {
      const newTodo = {
        id: getNewTodoID(currTodos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setCurrTodos(curTodos => ([
        ...curTodos,
        newTodo,
      ]));

      setUserId(0);
      setTitle('');
      setValidSubmit(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          {!title && validSubmit
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => setUserId(+event.target.value)}
            >
              <option value="0" selected disabled>Choose a user</option>
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
          {!userId && validSubmit
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currTodos} />
    </div>
  );
};
