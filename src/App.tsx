import './App.scss';

import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/user';
import { Todo } from './types/todo';
import { Form } from './types/form';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const DEFAULT_FORM = {
  title: '',
  userId: 0,
};

export const App = () => {
  const [toDoList, setToDoList] = useState<Todo[]>(todos);
  const [data, setData] = useState<Form>(DEFAULT_FORM);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userSelectError, setUserSelectError] = useState<boolean>(false);

  const handleInputChange:
  React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setData({ ...data, title: event.target.value });
    setTitleError(false);
  };

  const handleSelectChange:
  React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setData({ ...data, userId: +event.target.value });
    setUserSelectError(false);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!data.title || !data.userId) {
      if (!data.title || data.title.length === 0) {
        setTitleError(true);
      }

      if (!data.userId) {
        setUserSelectError(true);
      }

      return;
    }

    const taskUser = getUser(data.userId);
    const taskId = [...toDoList].sort((a, b) => a.id - b.id);

    setToDoList([...toDoList,
      {
        ...data,
        id: taskId[toDoList.length - 1].id + 1,
        completed: false,
        user: taskUser,
      }]);

    setData(DEFAULT_FORM);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={data.title}
            onChange={handleInputChange}
          />
          {titleError
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            id="userId"
            value={data.userId}
            data-cy="userSelect"
            onChange={handleSelectChange}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}

                </option>
              );
            })}
          </select>

          {userSelectError
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
