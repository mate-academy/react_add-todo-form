import './App.scss';
import { useEffect, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const visibleTodos = [...todosFromServer];
const maxId = todosFromServer
  .map(todo => todo.id)
  .sort((a, b) => a - b).pop() || 0;

export const App: React.FC = () => {
  const [formValues, setFormValues] = useState({
    id: maxId + 1,
    title: '',
    completed: false,
    userId: 0,
  });

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const todos: Todo[] = visibleTodos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasTitle = formValues.title.trim() !== '';
    const hasUser = formValues.userId !== 0;

    if (hasUser && hasTitle) {
      visibleTodos.push(formValues);
      setFormValues({
        ...formValues,
        id: formValues.id + 1,
        title: '',
        userId: 0,
      });

      return;
    }

    if (!hasTitle) {
      setTitleError('Please enter a title');
      setFormValues({ ...formValues, title: '' });
    }

    if (!hasUser) {
      setUserError('Please choose a user');
    }
  };

  useEffect(() => {
  }, [visibleTodos]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={formValues.title}
            onChange={(e) => {
              setTitleError('');
              setFormValues({ ...formValues, title: e.target.value });
            }}
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={formValues.userId}
            onChange={(e) => {
              setUserError('');
              setFormValues({ ...formValues, userId: +e.target.value });
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          <span className="error">{userError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
