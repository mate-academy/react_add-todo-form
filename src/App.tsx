import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const todosWithUser = todosFromServer.map(todo => {
    const currentUser = usersFromServer.find(user => user.id === todo.userId);

    if (!currentUser) {
      throw new Error(`User with id ${todo.userId} not found!`);
    }

    return {
      ...todo,
      user: currentUser,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!userId) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    )!;

    const newTodo = {
      id: newId,
      title: title,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser, // Adicionando a propriedade 'user'
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          >
            <option value="0" disabled>
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

      <TodoList todos={todos} />
    </div>
  );
};
