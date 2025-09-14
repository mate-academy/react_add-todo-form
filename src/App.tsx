import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { useState } from 'react';
import users from './api/users';
import { Todo } from './components/types/Todo';

const completedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(completedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [idError, setIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let valid = true;

    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    }

    if (userId === 0) {
      setIdError(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(t => t.id)) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: users.find(u => u.id === userId)!,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(+event.target.value);
                setIdError(false);
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
          </label>
          {idError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
