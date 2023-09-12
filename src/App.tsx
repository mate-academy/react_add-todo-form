import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './types';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

// interface Todo {
//   id: number;
//   title: string;
//   userId: number;
//   completed: boolean;
// }

// interface User {
//   id: number;
//   name: string;
// }

const mapTodosWithUsers = (): Todo[] => {
  return todosFromServer.map((todo) => {
    const user = usersFromServer
      .find((mappedUser) => mappedUser.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(mapTodosWithUsers);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleError(!title);
      setUserError(!userId);

      return;
    }

    const largestId = Math.max(...todos.map((todo) => todo.id));

    const user = usersFromServer.find((u) => u.id === userId);

    const newTodo: Todo = {
      id: largestId + 1,
      title,
      userId,
      user,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitleError(false);
              setTitle(event.target.value);
            }}
            placeholder="Add todo"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId || ''}
            onChange={(event) => {
              setUserError(false);
              setUserId(Number(event.target.value));
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
