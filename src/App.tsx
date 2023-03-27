import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getBiggestId = (todo: Todo[]): number => {
  return Math.max(...todo.map(newTodo => newTodo.id)) + 1;
};

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const createNewTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: getBiggestId(todos),
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodoList([...todoList, newTodo]);

    setNewTitle('');
    setNewUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setShowTitleError(!newTitle);
    setShowUserError(!newUserId);

    if (newTitle && newUserId) {
      createNewTodo(newTitle, newUserId);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
              setShowTitleError(false);
            }}
          />

          {
            showTitleError
              && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            value={newUserId}
            onChange={event => {
              setNewUserId(+event.target.value);
              setShowUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {
            showUserError
              && <span className="error">Please choose a user</span>
          }
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
