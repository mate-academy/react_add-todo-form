import './App.scss';
import { useState, FC, ChangeEvent } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';
import { Todo } from './components/TodoInfo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
}

export const App: FC = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [todo, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [formErrors, setFormErrors]
    = useState<{ title?: string, user?: string }>({});

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUserId) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        user: 'Please choose a user',
      }));
    }

    if (title.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Please enter a title',
      }));
    }

    if (selectedUserId && title.trim() !== '') {
      const newId
        = todo.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

      const newUser = getUser(selectedUserId);

      const newTodo: Todo = {
        id: newId,
        title: title.trim(),
        userId: selectedUserId,
        completed: false,
        user: newUser,
      };

      setTodos([...todo, newTodo]);
      setTitle('');
      setSelectedUserId(0);
      setFormErrors({});
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setFormErrors(prevErrors => ({ ...prevErrors, title: '' }));
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);

    setSelectedUserId(selectedValue);
    setFormErrors(prevErrors => ({ ...prevErrors, user: '' }));
  };

  const selectedUserIdName = selectedUserId
    ? usersFromServer.find(user => user.id === selectedUserId)?.name
    : '';

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleInputChange}
            data-cy="titleInput"
          />

          {formErrors.title
            && <span className="error">{formErrors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.id}
                key={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {formErrors.user && <span className="error">{formErrors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {selectedUserIdName && <p>{`Selected user: ${selectedUserIdName}`}</p>}

      <TodoList todos={todo} />
    </div>
  );
};
