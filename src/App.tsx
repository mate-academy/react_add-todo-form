import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

// interface TodosList {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
// }

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }

// type Props = {
//   usersFromServer: 0;
// };

export const App: React.FC = () => {
  const [todo, setToDo] = useState('');
  const [selectedNameId, setSelectedNameId] = useState(0);
  const [todosList, setTodoList] = useState([...todosFromServer]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSelectEmpty, setIsSelectEmpty] = useState(false);
  const [todoId, setTodoId] = useState(15);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setToDo((event.target as HTMLInputElement).value);

    if ((event.target as HTMLInputElement).value.length > 0) {
      setIsTitleEmpty(false);
    } else {
      setIsTitleEmpty(true);
    }
  };

  const handleChangeSlect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedNameId(+event.target.value);

    if ((+event.target.value) > 0) {
      setIsSelectEmpty(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo !== '' && selectedNameId > 0) {
      setTodoList([...todosList, {
        id: todoId + 1,
        title: todo,
        completed: false,
        userId: +selectedNameId,
      }]);
      setTodoId(todoId + 1);
      setToDo('');
      setSelectedNameId(0);
    }

    if (+selectedNameId > 0) {
      setIsSelectEmpty(false);
    }

    if (+selectedNameId <= 0) {
      setIsSelectEmpty(true);
    }

    if (todo === '') {
      setIsTitleEmpty(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={todo}
            onChange={handleChange}
            placeholder="Enter a title"
          />

          {isTitleEmpty
            ? <span className="error">Please enter a title</span>
            : null}
        </div>

        <div className="field">
          <label htmlFor="usernames">User: </label>
          <select
            data-cy="userSelect"
            value={selectedNameId}
            onChange={handleChangeSlect}
            name="usernames"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isSelectEmpty
            ? <span className="error">Please choose a user</span>
            : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
