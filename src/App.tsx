import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(userSet => userSet.id === todo.userId)!;

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errors, setErrors] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleError = title.trim() === '';
    const userError = selectedUserId === 0;

    setErrors({
      title: titleError,
      user: userError,
    });
    if (titleError || userError) {
      return;
    }

    const id = (todos.length ? Math.max(...todos.map(toDo => toDo.id)) : 0) + 1;
    const user = users.find(userSet => userSet.id === selectedUserId);

    if (!user) {
      setErrors(prev => ({ ...prev, user: true }));

      return;
    }

    const newTodo: Todo = {
      id,
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId(0);
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeEvent => {
              setTitle(changeEvent.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: false }));
              }
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={changeEvent => {
              setSelectedUserId(Number(changeEvent.target.value));
              if (errors.user) {
                setErrors(prev => ({ ...prev, user: false }));
              }
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section>
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
