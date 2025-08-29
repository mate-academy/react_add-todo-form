import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/TodoType';
import { findUser } from './services/FindUser';
import { TodoWithUsers } from './types/TodoWithUsersType';
import React, { useState } from 'react';

const initialTodoList: TodoWithUsers[] = todosFromServer.map((todo: Todo) => {
  return {
    ...todo,
    user: findUser(todo.userId)!,
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState<TodoWithUsers[]>(initialTodoList);

  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('0');

  const generateNewId = (list: TodoWithUsers[]) => {
    return Math.max(...list.map((val: TodoWithUsers) => val.id)) + 1
  };

  const onAdd = (newTodo: TodoWithUsers) => {
    return setTodoList([...todoList, newTodo]);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.target.value);
    setSelectError(false);
  };

  const adjustTitle = () => {
    return title.split('').filter((symbol: string) => {
      return /[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+|\d+|\s{1}/.test(symbol) === true;
    }).join('');
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() && userSelect === '0') {
      setTitleError(true);
      setSelectError(true);
      return;
    }

    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    if (userSelect === '0') {
      setSelectError(true);
      return;
    }

    onAdd({
      id: generateNewId(todoList),
      title: adjustTitle(),
      completed: false,
      userId: +userSelect,
      user: usersFromServer[+userSelect - 1],
    });

    reset();
  };

  const reset = () => {
    setTitle('');
    setUserSelect('0');


    setTitleError(false);
    setSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-field">
            Title:
            <input
              id="title-field"
              type="text"
              data-cy="titleInput"
              placeholder='Enter a title'
              value={title}
              onChange={handleTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectUser-field">
            User:
            <select
              id="selectUser-field"
              data-cy="userSelect"
              value={userSelect}
              onChange={handleSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
