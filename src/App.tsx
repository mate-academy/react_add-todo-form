import { FC, useState } from 'react';
import todosFromServer from './api/todos';
import users from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export const App: FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [newTitle, setNewTitle] = useState('');
  const [choosedUser, setChoosedUser] = useState('Choose a user');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newId = todos[todos.length - 1].id + 1;
    const newUser = users.find(user => user.name === choosedUser);

    const newTodo = {
      userId: newUser?.id || 0,
      id: newId,
      title: newTitle,
      completed: false,
      user: newUser || null,
    };

    if (newTitle.length > 0 && choosedUser !== 'Choose a user') {
      setTodos((currentTodos) => [...currentTodos, newTodo]);

      setNewTitle('');
      setChoosedUser('Choose a user');
      setIsFormInvalid(false);
    } else {
      setIsFormInvalid(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
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
          {isFormInvalid && newTitle.length === 0
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
            <option disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {isFormInvalid && choosedUser === 'Choose a user'
            && 'Please choose a user'}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList preparedTodos={todos} />
    </div>
  );
};
