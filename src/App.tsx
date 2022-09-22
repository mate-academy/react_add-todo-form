import './App.scss';
import React from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { User } from './type/User';
import { Todo } from './type/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todo, setTodo] = React.useState([...todos]);
  const [newTitle, setTitle] = React.useState('');
  const [newName, setName] = React.useState('');
  const [switchClick, setSwitchClick] = React.useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (newTitle !== '' && newName !== '') {
      setTodo((prev) => {
        return [
          ...prev,
          {
            id: prev
              .map(({ id }) => id)
              .reduce((a, b) => Math.max(a, b), 0) + 1,
            userId: Number(todosFromServer.find(user => user.userId)),
            title: newTitle,
            completed: false,
            user: usersFromServer.find(user => user.name === newName) || null,
          },
        ];
      });

      setSwitchClick(false);
      setTitle('');
      setName('');
    } else {
      setSwitchClick(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={(event) => {
              setTitle(event.target.value);
            }}

          />
          {(newTitle === '' && switchClick)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newName}
            onChange={(event) => {
              setName(event.target.value);
            }}

          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          {(newName === '' && switchClick)
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todo} />
    </div>
  );
};
