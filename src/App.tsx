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
  const [selectedUserId, setSelectedUserId] = useState<string>('0');
  const [formSubmitedError, setFormSubmitedError] = useState<boolean>(false);
  // Adiciona o usuário completo a cada todo
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

    if (!title || selectedUserId === '0') {
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
    setSelectedUserId('0');
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
              setFormSubmitedError(false);
              setTitle(e.target.value);
            }}
            data-cy="titleInput"
          />
          {formSubmitedError && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setFormSubmitedError(false);
              setSelectedUserId(e.target.value);
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

          {formSubmitedError && selectedUserId === '0' && (
            <span className="error">Please choose a user</span>
          )}
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
