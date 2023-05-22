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

  const todos: Todo[] = visibleTodos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasTitle = formValues.title.trim() !== '';

    if (formValues.userId !== 0 && hasTitle) {
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
      const titleSelect = document.querySelector('#title');

      if (titleSelect?.nextSibling?.nodeName !== 'SPAN') {
        titleSelect?.insertAdjacentHTML(
          'afterend', '<span class="error">Please enter a title</span>',
        );
      }

      setFormValues({ ...formValues, title: '' });
    }

    if (formValues.userId === 0) {
      const userSelect = document.querySelector('#userSelect');

      if (!userSelect?.nextSibling) {
        userSelect?.insertAdjacentHTML(
          'afterend', '<span class="error">Please choose a user</span',
        );
      }
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
              const title = document.querySelector('#title');

              title?.nextSibling?.replaceWith('');
              setFormValues({ ...formValues, title: e.target.value });
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={formValues.userId}
            onChange={(e) => {
              const userSelect = document.querySelector('#userSelect');

              userSelect?.nextSibling?.replaceWith('');
              setFormValues({ ...formValues, userId: +e.target.value });
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
