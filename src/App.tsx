import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState(todosFromServer);
  const [formSubmited, setFormSubmited] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);

    if (title.trim() === '' || selectedUserId === null) {
      return;
    }

    const newTodo: Todo ={
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUserId(null);
    setFormSubmited(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setFormSubmited(false);
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value) || null);
    setFormSubmited(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={title}
            onChange={handleTitleChange}
            />
            {formSubmited && title.trim() === '' && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId ?? 0}
            onChange={handleUserChange}
            >
              <option value='0' disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
            {formSubmited && selectedUserId === null && (
              <span className="error">Please choose a user</span>
            )}
          </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
