import './App.scss';
import { FC, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
// import { UserInfo } from './components/UserInfo/UserInfo';
// import { TodoInfo } from './components/TodoInfo/TodoInfo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [errorEmptyTitle, setErrorEmptyTitle] = useState('');
  const [errorEmptyUserId, setErrorEmptyUserId] = useState('');

  const createNewTodo = () => {
    const todoId = Math.max(...(todos.map(todo => todo.id))) + 1;

    return (
      {
        id: todoId,
        title: todoTitle,
        completed: false,
        userId,
        user: usersFromServer.find(user => user.id === Number(userId)) || null,
      }
    );
  };

  const addNewTodo = (): void => {
    if (!todoTitle) {
      setErrorEmptyTitle('Please enter a title');
    }

    if (!userId) {
      setErrorEmptyUserId('Please choose a user');
    }

    if (!todoTitle || !userId) {
      return;
    }

    if (todoTitle && userId) {
      setVisibleTodos((prevTodos) => [...prevTodos, createNewTodo()]);
    }

    setTodoTitle('');
    setUserId(0);

    setErrorEmptyTitle('');
    setErrorEmptyUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Todo title"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle((event.target.value).trim());
            }}
          />
          <span className="error">
            {!todoTitle && errorEmptyTitle}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(
                user => <option value={user.id}>{user.name}</option>,
              )
            }

          </select>

          <span className="error">
            {!userId && errorEmptyUserId}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
