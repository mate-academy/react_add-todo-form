import { FC, useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export const App: FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [choosedUser, setChoosedUser] = useState('Choose a user');
  const [clikedAdd, setClikedAdd] = useState(false);

  const addNewTodo = () => {
    const newId = preparedTodos[preparedTodos.length - 1].id + 1;
    const newUserId = users.find(user => user.name === choosedUser)?.id;
    const newUser = users.find(user => user.name === choosedUser);

    if (newTitle.length > 0 && choosedUser !== 'Choose a user') {
      preparedTodos.push({
        userId: newUserId || 0,
        id: newId,
        title: newTitle,
        completed: false,
        user: newUser || null,
      });

      setNewTitle('');
      setChoosedUser('Choose a user');
      setClikedAdd(false);
    } else {
      setClikedAdd(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <span className="error">Title:</span>
          <textarea
            name="title"
            data-cy="titleInput"
            value={newTitle}
            placeholder="title"
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
          />
          {clikedAdd && newTitle.length === 0
            && 'Please enter the title'}
        </div>

        <div className="field">
          <span className="error">User:</span>
          <select
            data-cy="userSelect"
            value={choosedUser}
            onChange={({ target }) => {
              setChoosedUser(target.value);
            }}
          >
            <option>Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {clikedAdd && choosedUser === 'Choose a user'
            && 'Please choose a user'}
        </div>

        <button
          type="button"
          data-cy="submitButton"
          onClick={addNewTodo}
        >
          Add
        </button>
      </form>

      <TodoList preparedTodos={preparedTodos} />
    </div>
  );
};
