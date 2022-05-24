import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';

const preparedList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type Target = {
  name: string,
  value: string,
  checked?: boolean,
  type: string
};

enum TypeOfChange {
  Title = 'title',
  Username = 'users',
  Complete = 'complete',
}

const App: React.FC = () => {
  const [userList, addUser] = useState([...preparedList]);
  const [username, changeUser] = useState('');
  const [title, changeTitle] = useState('');
  const [completed, changeComplete] = useState(false);
  const [isMistakeTitle, changeMistakeTitle] = useState(false);
  const [isMistakeUserName, changeMistakeUserName] = useState(false);

  function handleChange({ name, value, type }: Target) {
    if (type === 'checkbox') {
      changeComplete(!completed);
    }

    switch (name) {
      case TypeOfChange.Title:
        changeMistakeTitle(false);
        changeTitle(value);
        break;
      case TypeOfChange.Username:
        changeMistakeUserName(false);
        changeUser(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <form
        className="form"
        onSubmit={
          (event): void | 'error' => {
            event.preventDefault();

            if (!title.length) {
              changeMistakeTitle(true);
            } else if (!username.length) {
              changeMistakeUserName(true);
            } else {
              const copyOfUser = [...userList];

              const userFound = users.find(user => user.name === username) ||
              null;

              const newObj = {
                userId: userFound?.id || 0,
                id: userList.length,
                title,
                completed,
                user: userFound,
              };

              copyOfUser.push(newObj);

              changeTitle('');

              changeUser('');

              changeComplete(false);

              addUser(copyOfUser);
            }
          }
        }
      >
        <label className="label1">
          <p>Name of task</p>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => handleChange(target)}
          />
        </label>
        {isMistakeTitle && (<p style={{ color: 'red' }}>Enter Title!!!</p>)}
        <select
          value={username}
          name="users"
          id="users"
          onChange={({ target }) => handleChange(target)}
        >
          <option value="" key="default">Choose please</option>
          {users.map(user => (
            <option value={user.name} key={user.id}>{user.name}</option>
          ))}
        </select>
        {isMistakeUserName && (<p style={{ color: 'red' }}>Choose User!!!</p>)}

        <input
          type="checkbox"
          name="complete"
          checked={completed}
          onChange={({ target }) => handleChange(target)}
        />

        <button
          type="submit"
        >
          ADD
        </button>
      </form>

      <TodoList preplist={userList} />
    </div>
  );
};

export default App;
