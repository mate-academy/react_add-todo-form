import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const todosWithUsers: Todo[] = todosFromServer.map((todo) => {
  const user = usersFromServer.find((person) => todo.userId === person.id);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>(todosWithUsers);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUser, setTodoUser] = useState(0);
  const [todoTitleError, setTodoTitleError] = useState(false);
  const [todoUserError, setTodoUserError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUser(0);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUser(+event.target.value);
    setTodoUserError(false);
  };

  const handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTodoTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setTodoTitleError(() => true);
    }

    if (!todoUser) {
      setTodoUserError(() => true);
    }

    if (!todoTitle || !todoUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: todoUser,
      user: usersFromServer.find((person) => todoUser === person.id),
    };

    setTodo((prevTodos) => [...prevTodos, newTodo]);

    resetForm();
  };

  // console.log(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTodoTitle}
          />
          {todoTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            defaultValue="0"
            value={todoUser}
            onChange={handleUserId}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {todoUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
