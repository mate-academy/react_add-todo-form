import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || undefined,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(visibleTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [errors, setErrors] = useState({
    title: false,
    selectedUser: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      title: title.trim() === '',
      selectedUser: selectedUser === 0,
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser) || undefined,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
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
            onChange={event => {
              setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '')); // Filter title input
              setErrors(prev => ({ ...prev, title: false }));
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setErrors(prev => ({ ...prev, selectedUser: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.selectedUser && (
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
