import React, { useState, FormEvent, ChangeEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const startSelect = 0;
  const [titleTodo, setTitleTodo] = useState('');
  const [todosState, setTodoState] = useState([...todos]);
  const [userIdTodo, setUserIdTodo] = useState(startSelect);
  const [userState] = useState([...users]);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const preparedTodos: Todo[] = todosState.map(todo => ({
    ...todo,
    user: userState.find((user) => user.id === todo.userId),
  }));

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(event.target.value);
    setEmptyTitle(false);
  };

  const changeName = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserIdTodo(+event.target.value);
    setEmptyName(false);
  };

  const newTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userIdTodo) {
      setEmptyName(true);
    } else if (titleTodo === '') {
      setEmptyTitle(true);
    } else {
      setEmptyTitle(false);
      setEmptyName(false);

      setTodoState((prevTodo) => {
        prevTodo.push({
          title: titleTodo,
          id: prevTodo.length + 1,
          userId: userIdTodo,
          completed: false,
        });

        return prevTodo;
      });
    }

    setTitleTodo('');
  };

  return (
    <div className="app">
      <form onSubmit={newTodo} className="app__form">
        <div className="app__container">
          <select
            className="app__names"
            onChange={changeName}
            value={userIdTodo}
          >
            <option
              className="app__name"
              value={startSelect}
              disabled
            >
              Choose name
            </option>
            {users.map(user => (
              <option
                key={user.id}
                className="app__name"
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {emptyName && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <div className="app__container">
          <input
            name="title"
            className="app__title-todo"
            type="text"
            placeholder="title"
            value={titleTodo}
            onChange={changeTitle}
          />
          {emptyTitle && (
            <span className="error">Please enter the title</span>
          )}
        </div>

        <button type="submit" className="app__form__submit">
          Add
        </button>
      </form>
      <TodoList props={preparedTodos} />
    </div>
  );
};

export default App;
