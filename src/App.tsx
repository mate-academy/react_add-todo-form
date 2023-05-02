import './App.scss';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id);
}

function getMaxId(todos: Todo[]) {
  return todos
    .reduce((prev, cur) => ((prev.id > cur.id) ? prev : cur)).id;
}

const visibleTodos: Todo[] = todosFromServer.map(todo => {
  const userOfTodo = getUserById(todo.userId);
  const newTodo: Todo = { ...todo, user: userOfTodo || null };

  return newTodo;
});

export const App = () => {
  const [todos, setTodos] = useState(visibleTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectError, setSelectError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleReset = () => {
    setTodoTitle('');
    setSelectedUser('0');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = todoTitle.trim();
    const userOfTodo = getUserById(+selectedUser);
    const nextTodoId = getMaxId(todos) + 1;

    setTitleError(title === '');
    setSelectError(selectedUser === '0');

    if (title === '' || selectedUser === '0') {
      return;
    }

    if (userOfTodo) {
      const newTodo: Todo = {
        id: nextTodoId,
        title,
        completed: false,
        user: userOfTodo,
      };

      setTodos([...todos, newTodo]);
      handleReset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
            />

            {titleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {selectError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
