import './App.scss';
import { useState } from 'react';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

function getUser(userId: number): User | null {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const users: User[] = usersFromServer.map(user => ({
  ...user,
}));

export const App = () => {
  const [userSelect, setUserSelect] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubmit(true);
          if (userSelect && titleInput) {
            const selectedUser = users.find(user => user.name === userSelect);
            const maxId = Math.max(...todos.map(todo => todo.id));
            const todo:Todo = {
              id: maxId + 1,
              title: titleInput,
              userId: selectedUser?.id || null,
              user: selectedUser || null,
              completed: false,
            };

            todos.push(todo);
            setUserSelect('');
            setTitleInput('');
            setIsSubmit(false);
          }
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={(event) => (setTitleInput(event.target.value))}
          />
          {(!titleInput && isSubmit)
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            name="userSelect"
            id="userSelect"
            data-cy="userSelect"
            value={userSelect}
            onChange={(event) => (setUserSelect(event.target.value))}
          >
            <option
              value=""
              disabled
              selected
            >
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {(!userSelect && isSubmit)
           && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
