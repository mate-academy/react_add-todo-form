import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const users = usersFromServer;

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCompleted = false;

  const createId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const isFormValid = () => {
    if (title === '' || userId === 0) {
      return false;
    } else {
      return true;
    }
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          setIsSubmitted(true);
          if (isFormValid()) {
            addTodo({
              id: createId(),
              title: title,
              completed: isCompleted,
              userId: userId,
            });
            reset();
            setIsSubmitted(false);
          }
        }}
      >
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />

          {isSubmitted && title === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>
          <select
            data-cy="userSelect"
            id="user-id"
            required
            value={userId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setUserId(+event.target.value)
            }
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isSubmitted && userId === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} users={users} />
      </section>
    </div>
  );
};
