import { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosList = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosList);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddTodo = () => {
    if (!title) {
      setTitleError('Please enter a title');

      return;
    }

    if (!userId) {
      setUserError('Please choose a user');

      return;
    }

    setTitleError('');
    setUserError('');

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === Number(userId))!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos}></TodoList>
    </div>
  );
};
