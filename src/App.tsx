import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { PreparedTodo } from './Types/PreparedTodo';
import { User } from './Types/User';

import { TodoList } from './Components/TodoList/TodoList';

const App: React.FC = () => {
  const preparedTodos: PreparedTodo[] = todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId) as User,
    };
  });

  const [title, setTitle] = useState('');
  const [userId, setUser] = useState(0);
  const [todoList, setTodoList] = useState(preparedTodos);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addNewTodo = () => {
    const newTodo: PreparedTodo = {
      userId: +userId,
      id: todoList.length + 1,
      title,
      completed: false,
      user: users.find(person => person.id === +userId) as User,
    };

    setTodoList([...todoList, newTodo]);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      addNewTodo();
      setTitle('');
      setUser(0);
    }
  };

  const onCHangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const onCHangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action=""
        onSubmit={onFormSubmit}
      >
        <div
          className="form-style"
        >
          <input
            type="text"
            className="form-style"
            placeholder="Add todos"
            value={title}
            onChange={onCHangeInput}
          />
          {titleError && (
            <span
              className="error-style"
            >
              Enter Title please
            </span>
          )}

        </div>
        <div
          className="form-style"
        >
          <select
            name="userList"
            className="form-style"
            id="userList"
            value={userId}
            onChange={onCHangeSelect}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>
          {userError && (
            <span
              className="error-style"
            >
              Enter User please
            </span>
          )}
        </div>
        <div
          className="form-style"
        >
          <button
            type="submit"
            className="button-style"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};

export default App;
