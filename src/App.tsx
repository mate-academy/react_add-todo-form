import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userSelectedId, setUserSelectedId] = useState(0);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(todos);
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [userEmpty, setUserEmpty] = useState(false);

  const userSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelectedId(+event.target.value);
    setUserEmpty(false);
  };

  const resetForm = () => {
    setUserSelectedId(0);
    setTitle('');
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleEmpty(false);
  };

  const handleAddition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleEmpty(!title.trim());
    setUserEmpty(!userSelectedId);

    const newTodoId = Math.max(...todoList.map(todo => todo.id)) + 1;

    if (userSelectedId && title.trim()) {
      setTodoList([
        ...todoList,
        {
          id: newTodoId,
          userId: +userSelectedId,
          title,
          completed: false,
          user: getUserById(+userSelectedId),
        },
      ]);

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddition}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {titleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              required
              name="user"
              value={userSelectedId}
              onChange={userSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(userName => (
                <option key={userName.id} value={userName.id}>

                  {userName.name}
                </option>
              ))}
            </select>
          </label>

          {userEmpty && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
