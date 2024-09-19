import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todoList, setTodoList] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [error, setError] = useState({ title: '', user: '' });

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (e.target.value !== '') {
      setError({ ...error, user: '' });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== '') {
      setError({ ...error, title: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (title.trim() === '') {
      setError(prev => ({ ...prev, title: 'Please enter a title' }));
      isValid = false;
    }

    if (!userId) {
      setError(prev => ({ ...prev, user: 'Please choose a user' }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newTodo = {
      id: todoList.length ? Math.max(...todoList.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId), // Include the full user object
    };

    setTodoList(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter todo title"
          />
          {error.title && <span className="error">{error.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            value={userId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && <span className="error">{error.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todoList} />
      </section>
    </div>
  );
};
