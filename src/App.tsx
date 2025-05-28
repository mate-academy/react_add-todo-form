import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import User from './types/User';
import Todo from './types/Todo';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [formSubmitedError, setFormSubmitedError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)!,
  }));

  const toggleTodoCompleted = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (selectedUserId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      setFormSubmitedError(true);

      return;
    }

    const userId = Number(selectedUserId);
    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
    setFormSubmitedError(false);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (titleError || formSubmitedError) {
                setTitleError(false);
              }
            }}
            onBlur={() => {
              if (!title.trim()) {
                setTitleError(true);
              }
            }}
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(+e.target.value);
              if (userError || formSubmitedError) {
                setUserError(false);
              }
            }}
            onBlur={() => {
              if (selectedUserId === 0) {
                setUserError(true);
              }
            }}
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
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todosWithUsers} onToggle={toggleTodoCompleted} />
      </section>
    </div>
  );
};
