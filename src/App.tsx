import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUserId(id: number) {
  return usersFromServer.find(person => id === person.id);
}

const todosWithUser = todosFromServer.map(todo => {
  const user = getUserId(todo.userId);

  return {
    ...todo,
    user,
  };
});

function getMaxId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);
  const newId = Math.max(...ids) + 1;

  return newId;
}

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  function formReset() {
    setTodoTitle('');
    setTodoUserId('0');
  }

  function handleSubmitErrors() {
    if (!todoTitle.trim()) {
      setTitleError(true);
    }

    if (!+todoUserId) {
      setUserIdError(true);
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTodoUserId(event.target.value);
    if (userIdError) {
      setUserIdError(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const user = getUserId(+todoUserId);

    const newTodo = {
      id: getMaxId(todos),
      title: todoTitle,
      completed: false,
      userId: +todoUserId,
      user,
    };

    handleSubmitErrors();

    if (!todoTitle.trim() || !+todoUserId) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);

    formReset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            type="text"
            id="todoTitle"
            data-cy="titleInput"
            name="todoTitle"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todoUserId">User: </label>
          <select
            data-cy="userSelect"
            id="todoUserId"
            name="todoUserId"
            value={todoUserId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
