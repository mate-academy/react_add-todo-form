import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUsers: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  if (!user) {
    throw new Error(`User with id ${todo.userId} not found`);
  }

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [users] = useState<User[]>(usersFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [titleTouched, setTitleTouched] = useState(false);
  const [userTouched, setUserTouched] = useState(false);

  const getNextId = () => {
    return Math.max(0, ...todos.map(todo => todo.id)) + 1;
  };

  const isTitleInvalid = title.trim() === '';
  const isUserInvalid = userId === 0;

  const titleError = titleTouched && title.trim() === '';
  const userError = userTouched && userId === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleTouched(true);
    setUserTouched(true);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const user = users.find(item => item.id === userId);

    if (!user) {
      return;
    }

    const newTodo = {
      id: getNextId(),
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleTouched(false);
    setUserTouched(false);
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
              setTitle(event.target.value);
              setTitleTouched(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserTouched(false);
            }}
          >
            <option value={0}>Choose a user</option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
