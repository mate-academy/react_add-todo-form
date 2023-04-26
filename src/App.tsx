import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userSelected, setUserSelected] = useState(0);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(todos);
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [userEmpty, setUserEmpty] = useState(false);

  const userSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(+event.target.value);
    setUserEmpty(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleEmpty(false);
  };

  const handleAddition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleEmpty(title.trim() === '');
    setUserEmpty(userSelected === 0);

    const newTodoId = Math.max(...todoList.map(todo => todo.id)) + 1;

    if (userSelected !== 0 && title.trim() !== '') {
      setTodoList([
        ...todoList,
        {
          id: newTodoId,
          userId: +userSelected,
          title,
          completed: false,
          user: getUser(+userSelected),
        },
      ]);

      setUserSelected(0);
      setTitle('');
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
              value={userSelected}
              onChange={userSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(userName => (
                <option value={userName.id}>{userName.name}</option>
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
