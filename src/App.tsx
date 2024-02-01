import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/type';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

function getPostId(posts: Todo[]) {
  return Math.max(...posts.map(post => post.id));
}

const defaultList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(defaultList);
  const [title, setTitle] = useState('');
  const [userIDs, setUserIDs] = useState(0);
  const [flagTitle, setFlagTitle] = useState(false);
  const [flagUser, setFlagUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setFlagTitle(!title);
    setFlagUser(!userIDs);

    if (!title || !userIDs) {
      return false;
    }

    setTitle('');
    setUserIDs(0);
    setTodos(listValues => [...listValues, {
      id: getPostId(listValues) + 1,
      title,
      completed: false,
      userId: userIDs,
      user: getUserById(userIDs) || null,
    }]);

    return true;
  };

  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setFlagTitle(false);
  };

  const handleChangeUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserIDs(+event.target.value);
    setFlagUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        className="form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <span>Title</span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {flagTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <span>User</span>
          <select
            data-cy="userSelect"
            value={userIDs}
            onChange={handleChangeUser}
          >
            <option value="0" key="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {flagUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          className="form_action"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
