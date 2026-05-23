import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => {
      const foundUser = usersFromServer.find(
        currentUser => currentUser.id === todo.userId,
      );

      return { ...todo, user: foundUser };
    }),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    user: '',
  });

  const handleAddTodo = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const foundUser = usersFromServer.find(
      user => user.id === parseInt(selectedUserId),
    );

    if (!foundUser) {
      return;
    }

    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId: foundUser.id,
      user: foundUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setErrors({ title: '', user: '' });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
          handleAddTodo();
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Todo title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
              setErrors(prevErrors => ({ ...prevErrors, title: '' }));
            }}
            placeholder="Enter TODO title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Assign to user</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setErrors(prevErrors => ({ ...prevErrors, user: '' }));
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
