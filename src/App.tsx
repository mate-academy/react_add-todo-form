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
  const [newUserId, setUserId] = React.useState(0);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (newTitle.trim() !== '' && newName !== '') {
      setTodo((prev) => {
        const createNewId = prev
          .map(({ id }) => id)
          .reduce((a: number, b: number) => Math.max(a, b), 0) + 1;

        return [
          ...prev,
          {
            id: createNewId,
            userId: newUserId,
            title: newTitle,
            completed: false,
            user: getUser(newUserId),
          },
        ];
      });

      setSwitchClick(false);
      setTitle('');
      setName('');
      setUserId(0);
    } else {
      setSwitchClick(true);
    }
  };

  const handleChangeTitle = (
    event: { target: { value: React.SetStateAction<string> } },
  ) => {
    setTitle(event.target.value);
  };

  const handleChangeName = (
    event: { target: { value: React.SetStateAction<string> } },
  ) => {
    setName(event.target.value);
    setUserId(Number(usersFromServer
      .find(user => user.name === event.target.value)?.id));
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
            onChange={handleChangeTitle}

          />
          {(newTitle.trim() === '' && switchClick)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newName}
            onChange={handleChangeName}

          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id}>
                {name}
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
