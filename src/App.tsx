import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoData, setTodoData] = useState<Todo[]>([...todos]);
  const [selectUser, setSelectUser] = useState('0');
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      value,
    } = event.target;

    setUserError(false);

    setSelectUser(value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
    } = event.target;

    setTitleError(false);

    setTitle(value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = usersFromServer
      .find(user => user.name === selectUser) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!title.length) {
      setTitleError(true);
    }

    if (!currentUser || !title.length) {
      return;
    }

    setTodoData(
      [
        ...todoData,
        {
          id: todoData.length + 1,
          title,
          completed: false,
          userId: currentUser?.id,
          user: currentUser,
        },
      ],
    );

    setTitle('');
    setSelectUser('0');
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
          { titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="selectUser"
            value={selectUser}
            onChange={(handleChange)}
          >
            <option value="0" disabled> Choose a user </option>

            {usersFromServer.map((user) => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          { userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoData={todoData} />
    </div>
  );
};
