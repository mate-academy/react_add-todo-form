import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { useState } from 'react';

const getMaxId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);
  const [hasTitleErr, setTitleErr] = useState(false);
  const [hasUserErr, setUserErr] = useState(false);
  const [newTodos, setNewTodos] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const reset = () => {
    setTitleErr(false);
    setUserErr(false);
    setNewTodos({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const addTodo = ({ id, ...allData }: Todo) => {
    const newTodo = {
      id: getMaxId(todos),
      ...allData,
      userId: +allData.userId,
    };

    setTodos(curTodos => [...curTodos, newTodo]);
  };

  const handleSetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTitleErr(!value);
    setNewTodos(curUsers => ({ ...curUsers, [name]: value }));
  };

  const handleSetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setUserErr(!value);
    setNewTodos(curUsers => ({ ...curUsers, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleErr(!newTodos.title.trim());
    setUserErr(+newTodos.userId === 0);

    if (!newTodos.title.trim() || +newTodos.userId === 0) {
      return;
    }

    addTodo(newTodos);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={newTodos.title}
            onChange={handleSetInput}
            onBlur={handleSetInput}
            required
          />

          {hasTitleErr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userId"
            data-cy="userSelect"
            value={+newTodos.userId}
            onChange={handleSetSelect}
            onBlur={handleSetSelect}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserErr && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
