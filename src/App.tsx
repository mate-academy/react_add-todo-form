import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { FullTodo, Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepareTodos = (
  todos: Todo[],
  users: User[],
): FullTodo[] => (
  todos.map(todo => ({
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  }))
);

const preparedTodos = prepareTodos(todosFromServer, usersFromServer);

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);
  const [isSubmited, setIsSubmited] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setSelectedUserName('');
    setIsSubmited(false);
  };

  const handleTodos = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmited(true);

    const selectedUser = usersFromServer.find((user) => (
      user.name === selectedUserName
    ));

    if (!selectedUser
      || !selectedUserName
      || !todoTitle) {
      return;
    }

    const generatedId = Math.max(...visibleTodos.map((todo) => todo.id)) + 1;

    const todoToAdd = {
      id: generatedId,
      title: todoTitle,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser || null,
    };

    setVisibleTodos([...visibleTodos, todoToAdd]);

    resetForm();
  };

  const emptyTodoTitle = isSubmited && !todoTitle;
  const emptyTodoUser = isSubmited && !selectedUserName;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleTodos}
      >
        <div className="field">
          <label>
            {'Title '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
            />
          </label>
          {emptyTodoTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'Title '}

            <select
              data-cy="userSelect"
              value={selectedUserName}
              onChange={(event) => {
                setSelectedUserName(event.target.value);
              }}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {emptyTodoUser && (
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

      <TodoList todos={visibleTodos} />
    </div>
  );
};
