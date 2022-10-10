import { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSelectedUserEmpty, setIsSelectedUserEmpty] = useState(false);

  const processTitle = (str: string) => {
    return str.replace(/[^a-zA-Za-åa-ö-w-я 0-9]/gi, '');
  };

  const isValidInput = (title: string, userId: number):boolean => {
    if (title === '') {
      setIsTitleEmpty(true);
    }

    if (userId === 0) {
      setIsSelectedUserEmpty(true);
    }

    if (title === '' || userId === 0) {
      return false;
    }

    return true;
  };

  const onsubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = selectedUser;
    const title = processTitle(todoTitle);
    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!isValidInput(title, userId)) {
      return;
    }

    const newTodo = {
      id,
      title,
      completed: false,
      userId,
    };

    setTodos(prevTodos => {
      return [...prevTodos, newTodo];
    });

    setTodoTitle('');
    setSelectedUser(0);
  };

  const todosWithUserName = todos.map(todo => {
    const user = usersFromServer.find(item => item.id === todo.userId);
    const userName = user ? user.name : '';

    return {
      ...todo,
      userName,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => onsubmitHandler(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={event => {
              setIsTitleEmpty(false);
              setTodoTitle(event.target.value);
            }}
          />
          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setIsSelectedUserEmpty(false);
              setSelectedUser(+event.target.value);
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isSelectedUserEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todosWithUserName.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className="TodoInfo TodoInfo--completed"
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            <a className="UserInfo" href="mailto:Sincere@april.biz">
              {todo.userName}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
