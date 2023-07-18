import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId)
    || null;
};

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const onAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (!todoTitle) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!todoTitle || !userId) {
      return;
    }

    if (todoTitle && userId) {
      setHasTitleError(false);
      setHasUserIdError(false);
      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder="Enter title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </select>
          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={onAdd}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
