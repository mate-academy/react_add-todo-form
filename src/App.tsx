import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
// import { UserInfo } from './components/UserInfo';
// import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const founderUser = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: founderUser!,
      };
    });
  });

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const reset = () => {
    setTitle('');
    setUserId(0);

    setTitleError('');
    setUserError('');
  };

  const handleSubmit = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    let isFormValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isFormValid = false;
    }

    if (userId === 0) {
      setUserError('Please choose a user');
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    const founderUser = usersFromServer.find(user => user.id === userId);

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newId = maxId + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: founderUser!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={inputEvent => {
              setTitle(inputEvent.target.value);
              setTitleError('');
            }}
          />

          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={inputEvent => {
              setUserId(+inputEvent.target.value);
              setUserError('');
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user: User) => (
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
