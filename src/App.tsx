import { FC, useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const getUser = (userId: number) => {
  const foundUser = users.find(
    user => user.id === userId,
  );

  return foundUser || null;
};

let preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const App: FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  const addNewTodo = (newTitle: string, newUserId: number) => {
    const maxId = Math.max(...preparedTodos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title: newTitle,
      userId: newUserId,
      completed: false,
      user: getUser(newUserId),
    };

    preparedTodos = [...preparedTodos, newTodo];
  };

  const titleHandler = (value: string) => {
    setTitle(value);
    setTitleError(false);
  };

  const nameHandler = (value: number) => {
    setUserId(value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addNewTodo(title, userId);
    setTitle(() => (''));
    setUserId(() => (0));
  };

  return (
    <div className="App">
      <h1 hidden>Add todo form</h1>
      <form
        method="post"
        className="App__form"
        onSubmit={handleSubmit}
      >
        <h4 className="title">Add new TODO</h4>
        <label className="Input-field">
          Title:
          <textarea
            name="title"
            data-cy="titleInput"
            value={title}
            placeholder="title"
            onChange={(event) => titleHandler(event.target.value)}
          />
          {hasTitleError && 'Please enter the title'}
        </label>

        <label className="Input-field">
          User:
          <select
            name="user"
            data-cy="userSelect"
            value={userId}
            className="Input-field__select"
            onChange={event => nameHandler(+event.target.value)}
          >
            <option value="0">Choose a user</option>

            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserIdError && 'Please choose a user'}
        </label>

        <button
          type="button"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
