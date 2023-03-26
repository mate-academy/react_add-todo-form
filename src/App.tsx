import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [hasUserId, sethasUserId] = useState(false);

  const clearErrors = () => {
    setIsTitleEmpty(false);
    sethasUserId(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    clearErrors();
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    clearErrors();
  };

  const handleAddingTodos = () => {
    if (!title) {
      setIsTitleEmpty(true);
    }

    if (!userId) {
      sethasUserId(true);
    }

    if (!title || !userId) {
      return;
    }

    const { id } = todoList[todoList.length - 1];

    const newTodo: Todo = {
      id: id + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodoList([...todoList, newTodo]);

    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1 className="App_heading">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            placeholder="Please enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            className="mb-3 form-control"
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            value={userId}
            onChange={handleUser}
            className="form-select mb-3"
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

          { hasUserId && <span className="error">Please choose a user</span> }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddingTodos}
          className="btn btn-primary form-button"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
