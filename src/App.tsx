import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>(preparedTodos);
  const [userId, setUserId] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [selectUser, setSelectUser] = useState<string>('');
  const [checkTitle, setCheckTitle] = useState<boolean>(true);
  const [checkUser, setCheckUser] = useState<boolean>(true);
  const [checkSymbols, setCheckSymbols] = useState<boolean>(true);

  const setTitleAndId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.match(/[^a-zA-Z0-9а-яА-Я ]/)) {
      setCheckSymbols(false);

      setTimeout(() => setCheckSymbols(true), 3000);

      return;
    }

    setTitle(event.currentTarget.value.replace(/[^a-zA-Z0-9а-яА-Я ]/g, ''));
    setCheckTitle(true);
    setCheckSymbols(true);
    setId(todosList.length + 1);
  };

  const setUserInfo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const findUser = users.find(person => person.name
      === event.currentTarget.value);

    if (findUser !== undefined) {
      setUserId(findUser.id);
      setSelectUser(findUser.name);
      setCheckUser(true);

      setUser({
        name: findUser.name,
        email: findUser.email,
      });
    }
  };

  const reset = () => {
    setTitle('');
    setSelectUser('');
  };

  const addTodo = () => {
    setTodosList(
      [...todosList,
        {
          userId,
          id,
          completed: false,
          title,
          user,
        },
      ],
    );

    reset();
  };

  const checkForm = () => {
    if (title === '') {
      setCheckTitle(false);
    }

    if (selectUser === '') {
      setCheckUser(false);
    }

    if (title === '' || selectUser === '') {
      return;
    }

    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form>
        <input
          type="text"
          data-cy="titleInput"
          name="title"
          placeholder="Enter the title"
          onChange={setTitleAndId}
          value={title}
        />

        <p className={
          `${checkTitle ? 'hide' : 'error'}`
        }
        >
          Please enter the title
        </p>

        <p className={
          `${checkSymbols ? 'hide' : 'error'}`
        }
        >
          Allow entering only letters (ukr and en), digits and spaces
        </p>

        <select
          name="selectUser"
          data-cy="userSelect"
          value={selectUser}
          onChange={setUserInfo}
        >
          <option
            value=""
            hidden
          >
            Choose a user
          </option>
          {users.map(userName => (
            <option
              key={userName.id}
              value={userName.name}
            >
              {userName.name}
            </option>
          ))}
        </select>

        <p className={
          `${checkUser ? 'hide' : 'error'}`
        }
        >
          Please choose a user
        </p>

        <button
          type="button"
          onClick={checkForm}
        >
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};

export default App;
