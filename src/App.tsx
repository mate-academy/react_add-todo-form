import './App.scss';

import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/user';
import { Todo } from './types/todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [toDoList, setToDoList] = useState<Todo[]>(todos);
  const [dataTitle, setDataTitle] = useState<string>('');
  const [dataUserId, setDataUserId] = useState<number>(0);
  const [isTitleEntered, setIsTitleEntered] = useState<boolean>(false);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);

  const handleInputChange:
  React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDataTitle(event.target.value.trimStart());
    setIsTitleEntered(false);
  };

  const handleSelectChange:
  React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDataUserId(+event.target.value);
    setIsUserSelected(false);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!dataTitle || !dataUserId) {
      if (!dataTitle || dataTitle.length === 0) {
        setIsTitleEntered(true);
      }

      if (!dataUserId) {
        setIsUserSelected(true);
      }

      return;
    }

    const taskUser = usersFromServer.find(person => person.id === dataUserId);
    const taskId = [...toDoList].sort((a, b) => a.id - b.id);

    setToDoList([...toDoList,
      {
        id: taskId[toDoList.length - 1].id + 1,
        title: dataTitle,
        completed: false,
        userId: dataUserId,
        user: taskUser,
      }]);

    setDataTitle('');
    setDataUserId(0);
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
            value={dataTitle}
            onChange={handleInputChange}
          />
          {isTitleEntered
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            id="userId"
            value={dataUserId}
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

          {isUserSelected
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
