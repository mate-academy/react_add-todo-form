import React, { useState } from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { FullTodo } from './types/FullTodo';
import { User } from './types/User';
import { TodoList } from './TodoList/TodoList';

function prepared(
  todos: Todo[],
  users : User[],
): FullTodo[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
}

const App: React.FC = () => {
  const preparedTodos = prepared(todosFromServer, usersFromServer);

  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasIdError, setIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const choosedUser = usersFromServer.find(user => user.id === id) || null;

    if (!title) {
      setTitleError(true);
    }

    if (!id) {
      setIdError(true);
    }

    if (title && id && choosedUser) {
      const newTodo = {
        user: choosedUser,
        id: todos.length + 1,
        title,
        userId: choosedUser.id,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setId(0);
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
      >
        <div className="form__fields">
          <input
            type="text"
            name="title"
            placeholder="Enter the task"
            value={title}
            onChange={event => {
              setTitleError(false);

              setTitle(event.target.value);
            }}
          />
          {hasTitleError && <span className="error"> Please enter the title </span>}

          <select
            name="user"
            value={id}
            onChange={event => {
              setIdError(false);

              setId(+event.target.value);
            }}
          >
            <option value={0}>
              Choose the user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasIdError && <span className="error"> Please choose a user </span>}

          <button type="submit"> Add </button>
        </div>

      </form>

      <TodoList todoList={todos} />
    </div>
  );
};

export default App;
