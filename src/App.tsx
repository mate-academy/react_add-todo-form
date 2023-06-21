import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [newtodoList, setNewTodoList] = useState(todos);
  const [noTitle, setNoTitle] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setNoTitle(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setNoUser(false);
  };

  const handleAddTodo = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      setNoUser(true);
    }

    if (!title.trim()) {
      setNoTitle(true);
    }

    const maxId = Math.max(...newtodoList.map((todo:Todo) => todo.id));

    if (userId && title) {
      const newTodo: Todo = {
        id: maxId + 1,
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setNewTodoList([...newtodoList, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title: &nbsp;
          </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {noTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User: &nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="user"
            value={userId || '0'}
            onChange={handleUserChange}
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

          {noUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newtodoList} />
    </div>
  );
};
