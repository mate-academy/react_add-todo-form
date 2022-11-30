import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosArr = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosArr);
  const [userId, setUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [submitAcces, setSubmitAcces] = useState(false);
  const [visibleAttention, setVisibleAttention] = useState(false);

  const changeSumbitAcces = (todo_title: string, user_id: number) => {
    if (user_id && todo_title) {
      setSubmitAcces(true);
    }
  };

  const findLastIndex = (prevTodos: Todo[]): number => (
    prevTodos.reduce((maxID, currentTodo) => (
      Math.max(maxID, currentTodo.id)), 0)
  );

  const checkInputString = (str: string): string => {
    str.replace(/[^a-zA-Z\u0400-\u04FF\0-9 ]/g, '');

    return str;
  };

  const updateTodos = (todo_title: string, user_id: number) => {
    setTodos((prevTodos) => (
      [...prevTodos,
        {
          id: findLastIndex(prevTodos) + 1,
          title: todo_title,
          userId: user_id,
          completed: false,
          user: getUser(user_id),
        }]
    ));
  };

  const resetForm = () => {
    setUserId(0);
    setTodoTitle('');
    setVisibleAttention(false);
  };

  const handleSubmitData = () => {
    if (submitAcces) {
      updateTodos(todoTitle, userId);
      resetForm();
    } else {
      setVisibleAttention(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitData();
        }}
      >
        <div className="field">
          <label htmlFor="title_id">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={todoTitle}
            id="title_id"
            placeholder="Enter a title"
            onChange={(event) => {
              const inputTitle = checkInputString(event.target.value);

              setTodoTitle(inputTitle);
              changeSumbitAcces(inputTitle, userId);
            }}
          />
          {(!todoTitle && visibleAttention) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user_id">
            User:
          </label>
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            id="user_id"
            onChange={(event) => {
              const { value } = event.target;

              setUserId(+value);
              changeSumbitAcces(todoTitle, +value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (

              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {(!userId && visibleAttention) && (
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

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
