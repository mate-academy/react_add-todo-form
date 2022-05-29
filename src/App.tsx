import React, { useState } from 'react';
import './App.scss';
import ClassNames from 'classnames';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  const preparedTodos = todos.map((todo) => {
    const findUser = users.find((user) => user.id === todo.userId);

    return { ...todo, user: findUser || null };
  });

  const [todoList, setTodoList] = useState(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isSelectValid, setIsSelectValid] = useState(true);

  const clearAddTodoForm = () => {
    setTodoTitle('');
    setSelectUser('');
  };

  const handleChangeTitle = (value: string) => {
    if (value.match('^[a-zA-Zа-яА-Я0-9 ]*$') != null) {
      setTodoTitle(value);
      setIsTitleValid(true);
    }
  };

  const isValid = () => {
    if (todoTitle !== '') {
      setIsTitleValid(true);
    } else {
      setIsTitleValid(false);

      return false;
    }

    if (selectUser !== '') {
      setIsSelectValid(true);
    } else {
      setIsSelectValid(false);

      return false;
    }

    return true;
  };

  const addTodo = () => {
    if (isValid()) {
      const todoId = Math.max(...todoList.map(item => item.id)) + 1;
      const userObj = users.find(person => person.id === +selectUser) || null;

      setTodoList(prevList => [...prevList, {
        id: todoId,
        userId: +selectUser,
        title: todoTitle,
        completed: false,
        user: userObj,
      }]);

      clearAddTodoForm();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Add todo form</h1>
        <form
          className="addTodo"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();

            addTodo();
          }}
        >
          <div className="addTodo__item">
            <input
              type="text"
              name="title"
              placeholder="Todo title"
              value={todoTitle}
              onChange={(e) => handleChangeTitle(e.target.value)}
            />
            <div className={ClassNames(
              'error',
              { error_show: !isTitleValid },
            )}
            >
              Please enter the title
            </div>
          </div>

          <div className="addTodo__item">
            <select
              value={selectUser}
              onChange={(e) => {
                setSelectUser(e.target.value);
                setIsSelectValid(true);
              }}
            >
              <option
                key={0}
              >
                Choose a user
              </option>
              {users.map((user) => (
                <option
                  key={user.id + 1}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <div className={ClassNames(
              'error',
              { error_show: !isSelectValid },
            )}
            >
              Please choose a user
            </div>
          </div>

          <button
            className="addTodo__btn"
            type="submit"
          >
            Add todo
          </button>
        </form>

        <TodoList
          todos={todoList}
        />

        {/* <p>
          <span>Users: </span>
          {users.length}
        </p> */}
      </div>
    </div>
  );
};

export default App;
