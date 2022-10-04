import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [titleEntered, setTitleEntered] = useState(true);
  const [userEntered, setUserEntered] = useState(true);
  const [todos, setTodos] = useState([...initialTodos]);
  const [newTodo, setNewTodo] = useState({
    id: initialTodos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
    title: '',
    completed: false,
    userId: 0,
    user: getUser(0),
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (newTodo.userId === 0) {
            setUserEntered(false);
          }

          if (newTodo.title === '') {
            setTitleEntered(false);
          }

          if (newTodo.title !== '' && newTodo.userId !== 0) {
            setTodos([
              ...todos,
              newTodo,
            ]);
            setNewTodo({
              id: initialTodos
                .sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
              title: '',
              completed: false,
              userId: 0,
              user: getUser(0),
            });
          }
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={(event) => {
              setTitleEntered(true);
              setNewTodo({
                ...newTodo,
                title: event.target.value,
              });
            }}
          />
          {titleEntered || (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={(event) => {
              setUserEntered(true);
              setNewTodo({
                ...newTodo,
                userId: Number(event.target.value),
                user: getUser(+event.target.value),
              });
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userEntered || (
            <span className="error">
              Please choose a user
            </span>
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
